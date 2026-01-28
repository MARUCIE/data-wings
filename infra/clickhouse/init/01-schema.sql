-- Data Wings ClickHouse Schema
-- This script runs automatically when the ClickHouse container starts

CREATE DATABASE IF NOT EXISTS data_wings;

USE data_wings;

-- Events table: stores all user behavior events
CREATE TABLE IF NOT EXISTS events (
    event_id UUID DEFAULT generateUUIDv4(),
    event_name String,
    event_time DateTime64(3),
    event_date Date DEFAULT toDate(event_time),

    -- User identification
    user_id String,
    anonymous_id String,

    -- Event properties (JSON)
    properties String,

    -- Context
    page_url String,
    page_title String,
    referrer String,

    -- Device & Browser
    device_type String,
    browser String,
    os String,
    screen_width UInt16,
    screen_height UInt16,

    -- Location
    country String,
    city String,

    -- Attribution
    utm_source String,
    utm_medium String,
    utm_campaign String,

    -- Timestamps
    received_at DateTime64(3),
    processed_at DateTime DEFAULT now()
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)
ORDER BY (event_date, user_id, event_time)
TTL event_date + INTERVAL 2 YEAR;

-- Users table: user profile and traits
CREATE TABLE IF NOT EXISTS users (
    user_id String,
    email String,
    name String,
    traits String,
    created_at DateTime,
    first_seen_at DateTime,
    last_seen_at DateTime,
    total_events UInt64,
    total_sessions UInt32,
    lifetime_value Decimal64(2),
    segment String,
    updated_at DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(updated_at)
ORDER BY user_id;

-- Sessions table: aggregated session data
CREATE TABLE IF NOT EXISTS sessions (
    session_id String,
    user_id String,
    anonymous_id String,
    started_at DateTime64(3),
    ended_at DateTime64(3),
    duration_seconds UInt32,
    event_count UInt32,
    page_views UInt32,
    entry_page String,
    exit_page String,
    utm_source String,
    utm_medium String,
    utm_campaign String,
    device_type String,
    country String
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(toDate(started_at))
ORDER BY (toDate(started_at), user_id, started_at);

-- Funnels table: pre-computed funnel analysis
CREATE TABLE IF NOT EXISTS funnels (
    funnel_id String,
    funnel_name String,
    step_number UInt8,
    step_name String,
    date Date,
    entered_count UInt64,
    completed_count UInt64,
    conversion_rate Float64,
    segment String,
    device_type String
)
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, funnel_id, step_number, segment, device_type);

-- Create materialized view for real-time DAU
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_daily_active_users
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY date
AS SELECT
    toDate(event_time) AS date,
    uniqState(user_id) AS users_state,
    count() AS event_count
FROM events
GROUP BY date;

-- Create materialized view for event counts by type
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_event_counts
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, event_name)
AS SELECT
    toDate(event_time) AS date,
    event_name,
    count() AS count
FROM events
GROUP BY date, event_name;
