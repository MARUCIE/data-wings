// Package repository provides data access layer for the API service.
package repository

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/ClickHouse/clickhouse-go/v2"
	"github.com/ClickHouse/clickhouse-go/v2/lib/driver"
	"github.com/MARUCIE/data-wings/services/api/internal/config"
	"github.com/MARUCIE/data-wings/services/api/internal/models"
	"github.com/google/uuid"
)

// ClickHouseRepository handles all ClickHouse database operations.
type ClickHouseRepository struct {
	conn driver.Conn
}

// NewClickHouseRepository creates a new ClickHouse repository.
func NewClickHouseRepository(cfg *config.Config) (*ClickHouseRepository, error) {
	conn, err := clickhouse.Open(&clickhouse.Options{
		Addr: []string{fmt.Sprintf("%s:%d", cfg.ClickHouseHost, cfg.ClickHousePort)},
		Auth: clickhouse.Auth{
			Database: cfg.ClickHouseDatabase,
			Username: cfg.ClickHouseUser,
			Password: cfg.ClickHousePassword,
		},
		Debug: cfg.Debug,
		Settings: clickhouse.Settings{
			"max_execution_time": 60,
		},
		Compression: &clickhouse.Compression{
			Method: clickhouse.CompressionLZ4,
		},
		DialTimeout:     10 * time.Second,
		MaxOpenConns:    10,
		MaxIdleConns:    5,
		ConnMaxLifetime: time.Hour,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to ClickHouse: %w", err)
	}

	// Ping to verify connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := conn.Ping(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping ClickHouse: %w", err)
	}

	return &ClickHouseRepository{conn: conn}, nil
}

// Close closes the database connection.
func (r *ClickHouseRepository) Close() error {
	return r.conn.Close()
}

// InsertEvent inserts a single event into the events table.
func (r *ClickHouseRepository) InsertEvent(ctx context.Context, event *models.Event) error {
	query := `
		INSERT INTO events (
			event_id, event_name, event_time, event_date,
			user_id, anonymous_id, properties,
			page_url, page_title, referrer,
			device_type, browser, os, screen_width, screen_height,
			country, city,
			utm_source, utm_medium, utm_campaign,
			received_at
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	return r.conn.Exec(ctx, query,
		event.EventID,
		event.EventName,
		event.EventTime,
		event.EventDate,
		event.UserID,
		event.AnonymousID,
		event.Properties,
		event.PageURL,
		event.PageTitle,
		event.Referrer,
		event.DeviceType,
		event.Browser,
		event.OS,
		event.ScreenWidth,
		event.ScreenHeight,
		event.Country,
		event.City,
		event.UTMSource,
		event.UTMMedium,
		event.UTMCampaign,
		event.ReceivedAt,
	)
}

// InsertEventsBatch inserts multiple events in a batch.
func (r *ClickHouseRepository) InsertEventsBatch(ctx context.Context, events []*models.Event) error {
	batch, err := r.conn.PrepareBatch(ctx, `
		INSERT INTO events (
			event_id, event_name, event_time, event_date,
			user_id, anonymous_id, properties,
			page_url, page_title, referrer,
			device_type, browser, os, screen_width, screen_height,
			country, city,
			utm_source, utm_medium, utm_campaign,
			received_at
		)
	`)
	if err != nil {
		return fmt.Errorf("failed to prepare batch: %w", err)
	}

	for _, event := range events {
		err := batch.Append(
			event.EventID,
			event.EventName,
			event.EventTime,
			event.EventDate,
			event.UserID,
			event.AnonymousID,
			event.Properties,
			event.PageURL,
			event.PageTitle,
			event.Referrer,
			event.DeviceType,
			event.Browser,
			event.OS,
			event.ScreenWidth,
			event.ScreenHeight,
			event.Country,
			event.City,
			event.UTMSource,
			event.UTMMedium,
			event.UTMCampaign,
			event.ReceivedAt,
		)
		if err != nil {
			return fmt.Errorf("failed to append event to batch: %w", err)
		}
	}

	return batch.Send()
}

// UpsertUser inserts or updates a user profile.
func (r *ClickHouseRepository) UpsertUser(ctx context.Context, user *models.User) error {
	query := `
		INSERT INTO users (
			user_id, email, name, traits,
			created_at, first_seen_at, last_seen_at,
			total_events, total_sessions, lifetime_value, segment,
			updated_at
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	return r.conn.Exec(ctx, query,
		user.UserID,
		user.Email,
		user.Name,
		user.Traits,
		user.CreatedAt,
		user.FirstSeenAt,
		user.LastSeenAt,
		user.TotalEvents,
		user.TotalSessions,
		user.LifetimeValue,
		user.Segment,
		user.UpdatedAt,
	)
}

// QueryEvents queries events with optional filters.
func (r *ClickHouseRepository) QueryEvents(ctx context.Context, sql string, args ...interface{}) ([]map[string]interface{}, error) {
	rows, err := r.conn.Query(ctx, sql, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to execute query: %w", err)
	}
	defer rows.Close()

	columns := rows.Columns()
	columnTypes := rows.ColumnTypes()
	results := make([]map[string]interface{}, 0)

	for rows.Next() {
		scanTargets := makeScanTargets(columnTypes, len(columns))
		if err := rows.Scan(scanTargets...); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		row := make(map[string]interface{})
		for i, col := range columns {
			row[col] = normalizeScanValue(scanTargets[i])
		}
		results = append(results, row)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("failed to iterate rows: %w", err)
	}

	return results, nil
}

func makeScanTargets(columnTypes []driver.ColumnType, columnCount int) []interface{} {
	targets := make([]interface{}, columnCount)
	for i := 0; i < columnCount; i++ {
		if len(columnTypes) > i {
			targets[i] = newScanTarget(columnTypes[i])
			continue
		}
		var fallback interface{}
		targets[i] = &fallback
	}
	return targets
}

func newScanTarget(colType driver.ColumnType) interface{} {
	if colType != nil {
		if scanType := colType.ScanType(); scanType != nil {
			if scanType.Kind() == reflect.Ptr {
				return reflect.New(scanType.Elem()).Interface()
			}
			return reflect.New(scanType).Interface()
		}
		if name := colType.DatabaseTypeName(); name != "" {
			return scanTargetByTypeName(name)
		}
	}
	var fallback interface{}
	return &fallback
}

func scanTargetByTypeName(name string) interface{} {
	base := normalizeClickHouseType(name)
	switch base {
	case "String", "FixedString":
		var v string
		return &v
	case "UInt8", "UInt16", "UInt32", "UInt64":
		var v uint64
		return &v
	case "Int8", "Int16", "Int32", "Int64":
		var v int64
		return &v
	case "Float32", "Float64":
		var v float64
		return &v
	case "Date", "DateTime", "DateTime64":
		var v time.Time
		return &v
	case "UUID":
		var v uuid.UUID
		return &v
	default:
		var v interface{}
		return &v
	}
}

func normalizeClickHouseType(name string) string {
	clean := strings.TrimSpace(name)
	for {
		if strings.HasPrefix(clean, "Nullable(") && strings.HasSuffix(clean, ")") {
			clean = strings.TrimSuffix(strings.TrimPrefix(clean, "Nullable("), ")")
			continue
		}
		if strings.HasPrefix(clean, "LowCardinality(") && strings.HasSuffix(clean, ")") {
			clean = strings.TrimSuffix(strings.TrimPrefix(clean, "LowCardinality("), ")")
			continue
		}
		break
	}
	return clean
}

func normalizeScanValue(value interface{}) interface{} {
	if value == nil {
		return nil
	}
	val := reflect.ValueOf(value)
	if val.Kind() == reflect.Ptr {
		if val.IsNil() {
			return nil
		}
		value = val.Elem().Interface()
	}

	switch v := value.(type) {
	case sql.NullString:
		if v.Valid {
			return v.String
		}
		return nil
	case sql.NullInt64:
		if v.Valid {
			return v.Int64
		}
		return nil
	case sql.NullFloat64:
		if v.Valid {
			return v.Float64
		}
		return nil
	case sql.NullBool:
		if v.Valid {
			return v.Bool
		}
		return nil
	case sql.NullTime:
		if v.Valid {
			return v.Time
		}
		return nil
	case []byte:
		return string(v)
	default:
		return value
	}
}

// GetDAU returns daily active users for a date range.
func (r *ClickHouseRepository) GetDAU(ctx context.Context, startDate, endDate string) ([]map[string]interface{}, error) {
	query := `
		SELECT
			toDate(event_time) AS date,
			uniq(user_id) AS dau
		FROM events
		WHERE event_date >= ? AND event_date <= ?
		GROUP BY date
		ORDER BY date
	`
	return r.QueryEvents(ctx, query, startDate, endDate)
}

// GetEventCounts returns event counts by name for a date range.
func (r *ClickHouseRepository) GetEventCounts(ctx context.Context, startDate, endDate string) ([]map[string]interface{}, error) {
	query := `
		SELECT
			event_name,
			count() AS count
		FROM events
		WHERE event_date >= ? AND event_date <= ?
		GROUP BY event_name
		ORDER BY count DESC
		LIMIT 20
	`
	return r.QueryEvents(ctx, query, startDate, endDate)
}

// ConvertTrackRequestToEvent converts a TrackRequest to an Event model.
func ConvertTrackRequestToEvent(req *models.TrackRequest) (*models.Event, error) {
	now := time.Now()

	// Parse event time or use current time
	var eventTime time.Time
	if req.EventTime != "" {
		var err error
		eventTime, err = time.Parse(time.RFC3339, req.EventTime)
		if err != nil {
			eventTime = now
		}
	} else {
		eventTime = now
	}

	// Convert properties to JSON string
	propertiesJSON, err := json.Marshal(req.Properties)
	if err != nil {
		propertiesJSON = []byte("{}")
	}

	event := &models.Event{
		EventID:     uuid.New(),
		EventName:   req.EventName,
		EventTime:   eventTime,
		EventDate:   eventTime.Format("2006-01-02"),
		UserID:      req.UserID,
		AnonymousID: req.AnonymousID,
		Properties:  string(propertiesJSON),
		ReceivedAt:  now,
	}

	// Extract context fields
	if req.Context != nil {
		if req.Context.Page != nil {
			event.PageURL = req.Context.Page.URL
			event.PageTitle = req.Context.Page.Title
			event.Referrer = req.Context.Page.Referrer
		}
		if req.Context.Device != nil {
			event.DeviceType = req.Context.Device.Type
			event.ScreenWidth = req.Context.Device.ScreenWidth
			event.ScreenHeight = req.Context.Device.ScreenHeight
		}
		if req.Context.Browser != nil {
			event.Browser = req.Context.Browser.Name
		}
		if req.Context.OS != nil {
			event.OS = req.Context.OS.Name
		}
		if req.Context.Campaign != nil {
			event.UTMSource = req.Context.Campaign.Source
			event.UTMMedium = req.Context.Campaign.Medium
			event.UTMCampaign = req.Context.Campaign.Campaign
		}
	}

	return event, nil
}
