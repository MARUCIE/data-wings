// Package models defines the data structures for the API service.
package models

import (
	"time"

	"github.com/google/uuid"
)

// Event represents a tracked user event.
type Event struct {
	EventID     uuid.UUID `json:"event_id"`
	EventName   string    `json:"event_name" binding:"required"`
	EventTime   time.Time `json:"event_time"`
	EventDate   string    `json:"event_date"`
	UserID      string    `json:"user_id"`
	AnonymousID string    `json:"anonymous_id" binding:"required"`
	Properties  string    `json:"properties"` // JSON string

	// Context
	PageURL   string `json:"page_url"`
	PageTitle string `json:"page_title"`
	Referrer  string `json:"referrer"`

	// Device & Browser
	DeviceType   string `json:"device_type"`
	Browser      string `json:"browser"`
	OS           string `json:"os"`
	ScreenWidth  int    `json:"screen_width"`
	ScreenHeight int    `json:"screen_height"`

	// Location
	Country string `json:"country"`
	City    string `json:"city"`

	// Attribution
	UTMSource   string `json:"utm_source"`
	UTMMedium   string `json:"utm_medium"`
	UTMCampaign string `json:"utm_campaign"`

	// Timestamps
	ReceivedAt  time.Time `json:"received_at"`
	ProcessedAt time.Time `json:"processed_at"`
}

// TrackRequest is the request body for the track endpoint.
type TrackRequest struct {
	EventName   string                 `json:"event_name" binding:"required"`
	EventTime   string                 `json:"event_time"`
	UserID      string                 `json:"user_id"`
	AnonymousID string                 `json:"anonymous_id" binding:"required"`
	Properties  map[string]interface{} `json:"properties"`
	Context     *EventContext          `json:"context"`
}

// EventContext contains contextual information about the event.
type EventContext struct {
	Page     *PageContext     `json:"page"`
	Device   *DeviceContext   `json:"device"`
	Browser  *BrowserContext  `json:"browser"`
	OS       *OSContext       `json:"os"`
	Campaign *CampaignContext `json:"campaign"`
	Locale   string           `json:"locale"`
	Timezone string           `json:"timezone"`
	Library  *LibraryContext  `json:"library"`
}

// PageContext contains page-related information.
type PageContext struct {
	URL      string `json:"url"`
	Title    string `json:"title"`
	Path     string `json:"path"`
	Referrer string `json:"referrer"`
}

// DeviceContext contains device information.
type DeviceContext struct {
	Type         string `json:"type"`
	ScreenWidth  int    `json:"screen_width"`
	ScreenHeight int    `json:"screen_height"`
}

// BrowserContext contains browser information.
type BrowserContext struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

// OSContext contains operating system information.
type OSContext struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

// CampaignContext contains UTM campaign information.
type CampaignContext struct {
	Source   string `json:"source"`
	Medium   string `json:"medium"`
	Campaign string `json:"campaign"`
	Term     string `json:"term"`
	Content  string `json:"content"`
}

// LibraryContext contains SDK library information.
type LibraryContext struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

// IdentifyRequest is the request body for the identify endpoint.
type IdentifyRequest struct {
	UserID      string                 `json:"user_id" binding:"required"`
	AnonymousID string                 `json:"anonymous_id"`
	Traits      map[string]interface{} `json:"traits"`
}

// BatchRequest is the request body for the batch endpoint.
type BatchRequest struct {
	Events []TrackRequest `json:"events" binding:"required,dive"`
}

// User represents a user profile.
type User struct {
	UserID        string    `json:"user_id"`
	Email         string    `json:"email"`
	Name          string    `json:"name"`
	Traits        string    `json:"traits"` // JSON string
	CreatedAt     time.Time `json:"created_at"`
	FirstSeenAt   time.Time `json:"first_seen_at"`
	LastSeenAt    time.Time `json:"last_seen_at"`
	TotalEvents   uint64    `json:"total_events"`
	TotalSessions uint32    `json:"total_sessions"`
	LifetimeValue float64   `json:"lifetime_value"`
	Segment       string    `json:"segment"`
	UpdatedAt     time.Time `json:"updated_at"`
}
