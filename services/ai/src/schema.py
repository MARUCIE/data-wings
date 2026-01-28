"""
ClickHouse Schema Definitions for Data Wings

This module defines the database schema and business glossary
that the NL2SQL engine uses to generate accurate queries.
"""

CLICKHOUSE_SCHEMA = """
-- Events table: stores all user behavior events
CREATE TABLE events (
    event_id UUID DEFAULT generateUUIDv4(),
    event_name String,              -- e.g., 'page_view', 'button_click', 'purchase'
    event_time DateTime64(3),       -- millisecond precision timestamp
    event_date Date DEFAULT toDate(event_time),

    -- User identification
    user_id String,                 -- authenticated user ID (nullable)
    anonymous_id String,            -- device/session ID

    -- Event properties (JSON)
    properties String,              -- JSON object with event-specific data

    -- Context
    page_url String,
    page_title String,
    referrer String,

    -- Device & Browser
    device_type String,             -- 'desktop', 'mobile', 'tablet'
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
CREATE TABLE users (
    user_id String,

    -- Profile
    email String,
    name String,

    -- Traits (JSON)
    traits String,                  -- JSON object with user attributes

    -- Lifecycle
    created_at DateTime,
    first_seen_at DateTime,
    last_seen_at DateTime,

    -- Computed metrics
    total_events UInt64,
    total_sessions UInt32,
    lifetime_value Decimal64(2),

    -- Segments
    segment String,                 -- 'new', 'active', 'power', 'churned'

    updated_at DateTime DEFAULT now()
)
ENGINE = ReplacingMergeTree(updated_at)
ORDER BY user_id;

-- Sessions table: aggregated session data
CREATE TABLE sessions (
    session_id String,
    user_id String,
    anonymous_id String,

    -- Timing
    started_at DateTime64(3),
    ended_at DateTime64(3),
    duration_seconds UInt32,

    -- Engagement
    event_count UInt32,
    page_views UInt32,

    -- Entry/Exit
    entry_page String,
    exit_page String,

    -- Attribution
    utm_source String,
    utm_medium String,
    utm_campaign String,

    -- Device
    device_type String,
    country String
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(toDate(started_at))
ORDER BY (toDate(started_at), user_id, started_at);

-- Funnels table: pre-computed funnel analysis
CREATE TABLE funnels (
    funnel_id String,
    funnel_name String,
    step_number UInt8,
    step_name String,

    -- Metrics
    date Date,
    entered_count UInt64,
    completed_count UInt64,
    conversion_rate Float64,

    -- Dimensions
    segment String,
    device_type String
)
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, funnel_id, step_number, segment, device_type);
"""

BUSINESS_GLOSSARY = """
## Key Metrics

- **DAU (Daily Active Users)**: COUNT(DISTINCT user_id) WHERE event_date = today()
- **WAU (Weekly Active Users)**: COUNT(DISTINCT user_id) WHERE event_date >= today() - 7
- **MAU (Monthly Active Users)**: COUNT(DISTINCT user_id) WHERE event_date >= today() - 30

- **Retention (Day N)**: Users active on Day N / Users acquired on Day 0
- **Stickiness**: DAU / MAU ratio (higher is better)

- **Session Duration**: Average time between first and last event in a session
- **Bounce Rate**: Sessions with only 1 page view / Total sessions

- **Conversion Rate**: Users completing goal / Users entering funnel
- **ARPU (Average Revenue Per User)**: Total revenue / Active users

## Common Event Names

| Chinese | English | Description |
|---------|---------|-------------|
| 页面浏览 | page_view | User viewed a page |
| 按钮点击 | button_click | User clicked a button |
| 表单提交 | form_submit | User submitted a form |
| 注册 | sign_up | User created an account |
| 登录 | login | User logged in |
| 购买 | purchase | User made a purchase |
| 加入购物车 | add_to_cart | User added item to cart |
| 搜索 | search | User performed a search |

## Time Ranges

- "今天" / "today": toDate(now())
- "昨天" / "yesterday": today() - 1
- "过去7天" / "last 7 days": event_date >= today() - 7
- "过去30天" / "last 30 days": event_date >= today() - 30
- "本周" / "this week": toStartOfWeek(event_date) = toStartOfWeek(today())
- "本月" / "this month": toStartOfMonth(event_date) = toStartOfMonth(today())
"""
