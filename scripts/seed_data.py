#!/usr/bin/env python3
"""
Data Wings Seed Data Generator

Generates realistic test data for development and testing.
Inserts events and users into ClickHouse.

Usage:
    python scripts/seed_data.py [--days 30] [--users 100] [--events-per-day 1000]
"""

import argparse
import json
import random
import uuid
from datetime import datetime, timedelta
from typing import Any

import clickhouse_connect

# Configuration
DEFAULT_DAYS = 30
DEFAULT_USERS = 100
DEFAULT_EVENTS_PER_DAY = 500

# Event types and their properties
EVENT_TYPES = [
    {
        "name": "$pageview",
        "weight": 40,
        "properties": lambda: {
            "page": random.choice(["/", "/features", "/pricing", "/docs", "/blog", "/about"]),
            "title": random.choice(["Home", "Features", "Pricing", "Docs", "Blog", "About"]),
        },
    },
    {
        "name": "$click",
        "weight": 25,
        "properties": lambda: {
            "element": random.choice(["button", "link", "card", "nav"]),
            "text": random.choice(["Sign Up", "Learn More", "Get Started", "View Demo"]),
        },
    },
    {
        "name": "sign_up",
        "weight": 5,
        "properties": lambda: {
            "method": random.choice(["email", "google", "github"]),
            "referrer": random.choice(["google", "twitter", "linkedin", "direct"]),
        },
    },
    {
        "name": "login",
        "weight": 10,
        "properties": lambda: {
            "method": random.choice(["email", "google", "github"]),
        },
    },
    {
        "name": "create_dashboard",
        "weight": 3,
        "properties": lambda: {
            "widget_count": random.randint(1, 6),
        },
    },
    {
        "name": "run_query",
        "weight": 8,
        "properties": lambda: {
            "query_type": random.choice(["sql", "natural_language"]),
            "execution_time_ms": random.randint(50, 2000),
        },
    },
    {
        "name": "export_report",
        "weight": 2,
        "properties": lambda: {
            "format": random.choice(["pdf", "csv", "png"]),
        },
    },
    {
        "name": "invite_team_member",
        "weight": 2,
        "properties": lambda: {
            "role": random.choice(["viewer", "editor", "admin"]),
        },
    },
    {
        "name": "upgrade_plan",
        "weight": 1,
        "properties": lambda: {
            "from_plan": "free",
            "to_plan": random.choice(["pro", "team", "enterprise"]),
            "amount": random.choice([29, 79, 199]),
        },
    },
    {
        "name": "view_pricing",
        "weight": 4,
        "properties": lambda: {},
    },
]

# Device types
DEVICES = [
    {"type": "desktop", "weight": 60},
    {"type": "mobile", "weight": 30},
    {"type": "tablet", "weight": 10},
]

# Browsers
BROWSERS = [
    {"name": "Chrome", "weight": 65},
    {"name": "Safari", "weight": 20},
    {"name": "Firefox", "weight": 10},
    {"name": "Edge", "weight": 5},
]

# Countries
COUNTRIES = [
    {"code": "CN", "weight": 40},
    {"code": "US", "weight": 25},
    {"code": "JP", "weight": 10},
    {"code": "DE", "weight": 5},
    {"code": "GB", "weight": 5},
    {"code": "FR", "weight": 5},
    {"code": "KR", "weight": 5},
    {"code": "Other", "weight": 5},
]

# UTM sources
UTM_SOURCES = [
    {"source": "google", "medium": "cpc", "weight": 30},
    {"source": "google", "medium": "organic", "weight": 25},
    {"source": "twitter", "medium": "social", "weight": 15},
    {"source": "linkedin", "medium": "social", "weight": 10},
    {"source": "github", "medium": "referral", "weight": 10},
    {"source": None, "medium": None, "weight": 10},  # Direct traffic
]


def weighted_choice(items: list[dict]) -> dict:
    """Select an item based on weights."""
    total = sum(item["weight"] for item in items)
    r = random.uniform(0, total)
    cumulative = 0
    for item in items:
        cumulative += item["weight"]
        if r <= cumulative:
            return item
    return items[-1]


def generate_users(count: int) -> list[dict[str, Any]]:
    """Generate user profiles."""
    users = []
    domains = ["gmail.com", "outlook.com", "company.com", "example.org"]
    segments = ["new", "active", "power", "churned"]

    for i in range(count):
        user_id = f"user_{i:05d}"
        created_days_ago = random.randint(1, 365)
        created_at = datetime.now() - timedelta(days=created_days_ago)

        users.append({
            "user_id": user_id,
            "email": f"user{i}@{random.choice(domains)}",
            "name": f"User {i}",
            "traits": json.dumps({
                "company": f"Company {i % 50}",
                "role": random.choice(["developer", "analyst", "manager", "founder"]),
                "plan": random.choice(["free", "pro", "team"]),
            }),
            "created_at": created_at,
            "first_seen_at": created_at,
            "last_seen_at": datetime.now() - timedelta(days=random.randint(0, 7)),
            "total_events": random.randint(10, 1000),
            "total_sessions": random.randint(1, 100),
            "lifetime_value": round(random.uniform(0, 500), 2),
            "segment": random.choice(segments),
            "updated_at": datetime.now(),
        })

    return users


def generate_events(
    users: list[dict],
    days: int,
    events_per_day: int,
) -> list[dict[str, Any]]:
    """Generate event data."""
    events = []
    user_ids = [u["user_id"] for u in users]
    anonymous_ids = [str(uuid.uuid4()) for _ in range(len(users) * 2)]

    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)

    current_date = start_date
    while current_date <= end_date:
        # Vary events per day (weekday vs weekend)
        day_multiplier = 0.7 if current_date.weekday() >= 5 else 1.0
        day_events = int(events_per_day * day_multiplier * random.uniform(0.8, 1.2))

        for _ in range(day_events):
            event_type = weighted_choice(EVENT_TYPES)
            device = weighted_choice(DEVICES)
            browser = weighted_choice(BROWSERS)
            country = weighted_choice(COUNTRIES)
            utm = weighted_choice(UTM_SOURCES)

            # Random time during the day (more activity during business hours)
            hour = random.choices(
                range(24),
                weights=[1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1],
            )[0]
            minute = random.randint(0, 59)
            second = random.randint(0, 59)

            event_time = current_date.replace(hour=hour, minute=minute, second=second)

            # 70% of events have a user_id (logged in)
            has_user_id = random.random() < 0.7
            user_id = random.choice(user_ids) if has_user_id else ""
            anonymous_id = random.choice(anonymous_ids)

            events.append({
                "event_id": str(uuid.uuid4()),
                "event_name": event_type["name"],
                "event_time": event_time,
                "event_date": event_time.strftime("%Y-%m-%d"),
                "user_id": user_id,
                "anonymous_id": anonymous_id,
                "properties": json.dumps(event_type["properties"]()),
                "page_url": f"https://app.datawings.io{random.choice(['/', '/dashboard', '/ask', '/settings'])}",
                "page_title": "Data Wings",
                "referrer": random.choice(["https://google.com", "https://twitter.com", ""]),
                "device_type": device["type"],
                "browser": browser["name"],
                "os": random.choice(["macOS", "Windows", "Linux", "iOS", "Android"]),
                "screen_width": random.choice([1920, 1440, 1366, 375, 414]),
                "screen_height": random.choice([1080, 900, 768, 667, 896]),
                "country": country["code"],
                "city": random.choice(["Beijing", "Shanghai", "New York", "Tokyo", "London"]),
                "utm_source": utm["source"] or "",
                "utm_medium": utm["medium"] or "",
                "utm_campaign": random.choice(["", "launch", "promo", "brand"]),
                "received_at": event_time + timedelta(milliseconds=random.randint(10, 100)),
            })

        current_date += timedelta(days=1)

    return events


def insert_data(users: list[dict], events: list[dict], host: str = "localhost", port: int = 8123):
    """Insert data into ClickHouse."""
    print(f"Connecting to ClickHouse at {host}:{port}...")

    client = clickhouse_connect.get_client(
        host=host,
        port=port,
        database="data_wings",
    )

    # Insert users
    print(f"Inserting {len(users)} users...")
    user_columns = list(users[0].keys())
    user_data = [[u[col] for col in user_columns] for u in users]
    client.insert("users", user_data, column_names=user_columns)

    # Insert events in batches
    print(f"Inserting {len(events)} events...")
    event_columns = list(events[0].keys())
    batch_size = 10000

    for i in range(0, len(events), batch_size):
        batch = events[i : i + batch_size]
        event_data = [[e[col] for col in event_columns] for e in batch]
        client.insert("events", event_data, column_names=event_columns)
        print(f"  Inserted {min(i + batch_size, len(events))}/{len(events)} events")

    print("Done!")


def main():
    parser = argparse.ArgumentParser(description="Generate seed data for Data Wings")
    parser.add_argument("--days", type=int, default=DEFAULT_DAYS, help="Number of days of data")
    parser.add_argument("--users", type=int, default=DEFAULT_USERS, help="Number of users")
    parser.add_argument(
        "--events-per-day",
        type=int,
        default=DEFAULT_EVENTS_PER_DAY,
        help="Average events per day",
    )
    parser.add_argument("--host", default="localhost", help="ClickHouse host")
    parser.add_argument("--port", type=int, default=8123, help="ClickHouse HTTP port")
    parser.add_argument("--dry-run", action="store_true", help="Generate but don't insert")

    args = parser.parse_args()

    print(f"Generating seed data:")
    print(f"  Days: {args.days}")
    print(f"  Users: {args.users}")
    print(f"  Events per day: {args.events_per_day}")
    print()

    users = generate_users(args.users)
    print(f"Generated {len(users)} users")

    events = generate_events(users, args.days, args.events_per_day)
    print(f"Generated {len(events)} events")

    if args.dry_run:
        print("\nDry run - not inserting data")
        print(f"Sample user: {json.dumps(users[0], indent=2, default=str)}")
        print(f"Sample event: {json.dumps(events[0], indent=2, default=str)}")
    else:
        print()
        try:
            insert_data(users, events, args.host, args.port)
        except Exception as e:
            print(f"Error inserting data: {e}")
            print("\nMake sure ClickHouse is running: docker compose up -d clickhouse")
            return 1

    return 0


if __name__ == "__main__":
    exit(main())
