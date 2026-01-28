"""
Data Wings Analytics Schema Definition

定义数据分析平台的核心表结构，用于 NL2SQL 的 Schema 映射。
"""

# 事件表 Schema
EVENTS_SCHEMA = """
-- 事件表：存储所有用户行为事件
CREATE TABLE events (
    event_id        String,           -- 事件唯一ID
    event_name      String,           -- 事件名称 (如: page_view, click, purchase)
    event_time      DateTime,         -- 事件发生时间
    user_id         String,           -- 用户ID
    session_id      String,           -- 会话ID
    device_type     String,           -- 设备类型 (mobile, desktop, tablet)
    os              String,           -- 操作系统 (iOS, Android, Windows, macOS)
    browser         String,           -- 浏览器 (Chrome, Safari, Firefox)
    country         String,           -- 国家
    city            String,           -- 城市
    referrer        String,           -- 来源页面
    utm_source      String,           -- UTM来源
    utm_medium      String,           -- UTM媒介
    utm_campaign    String,           -- UTM活动
    page_url        String,           -- 页面URL
    page_title      String,           -- 页面标题
    element_id      String,           -- 元素ID (点击事件)
    element_text    String,           -- 元素文本 (点击事件)
    revenue         Float64,          -- 收入金额 (购买事件)
    properties      String            -- 自定义属性 (JSON)
) ENGINE = MergeTree()
ORDER BY (event_time, user_id);
"""

# 用户表 Schema
USERS_SCHEMA = """
-- 用户表：存储用户属性
CREATE TABLE users (
    user_id         String,           -- 用户ID
    created_at      DateTime,         -- 注册时间
    email           String,           -- 邮箱
    name            String,           -- 姓名
    plan            String,           -- 订阅计划 (free, pro, enterprise)
    country         String,           -- 国家
    industry        String,           -- 行业
    company_size    String,           -- 公司规模
    first_seen      DateTime,         -- 首次访问时间
    last_seen       DateTime,         -- 最后访问时间
    total_events    UInt64,           -- 总事件数
    total_sessions  UInt64,           -- 总会话数
    total_revenue   Float64           -- 总收入
) ENGINE = MergeTree()
ORDER BY user_id;
"""

# 业务术语词典
BUSINESS_GLOSSARY = {
    "日活": "每日活跃用户数 (Daily Active Users, DAU)",
    "DAU": "COUNT(DISTINCT user_id) WHERE date = today",
    "周活": "每周活跃用户数 (Weekly Active Users, WAU)",
    "WAU": "COUNT(DISTINCT user_id) WHERE date >= today - 7",
    "月活": "每月活跃用户数 (Monthly Active Users, MAU)",
    "MAU": "COUNT(DISTINCT user_id) WHERE date >= today - 30",
    "留存率": "在指定时间后仍然活跃的用户比例",
    "7日留存": "注册后第7天仍活跃的用户 / 注册用户",
    "转化率": "完成目标行为的用户 / 开始行为的用户",
    "漏斗": "用户完成一系列步骤的转化过程",
    "PV": "页面浏览量 (Page Views)",
    "UV": "独立访客数 (Unique Visitors)",
    "跳出率": "只访问一个页面就离开的会话比例",
    "会话时长": "用户单次访问的持续时间",
    "ARPU": "每用户平均收入 (Average Revenue Per User)",
    "LTV": "用户生命周期价值 (Lifetime Value)",
}

# 常见事件名称映射
EVENT_NAME_MAPPING = {
    "登录": "login",
    "注册": "signup",
    "付费": "purchase",
    "购买": "purchase",
    "点击": "click",
    "浏览": "page_view",
    "访问": "page_view",
    "提交": "form_submit",
    "搜索": "search",
    "添加购物车": "add_to_cart",
    "结算": "checkout",
}

# 完整 Schema 文档（用于 LLM 上下文）
FULL_SCHEMA_DOC = f"""
## Data Wings 数据分析平台 Schema

### 1. 事件表 (events)
{EVENTS_SCHEMA}

### 2. 用户表 (users)
{USERS_SCHEMA}

### 3. 业务术语词典
{chr(10).join(f"- **{k}**: {v}" for k, v in BUSINESS_GLOSSARY.items())}

### 4. 事件名称映射
{chr(10).join(f"- {k} -> {v}" for k, v in EVENT_NAME_MAPPING.items())}

### 5. 常用查询模式

#### 日活趋势 (DAU Trend)
```sql
SELECT
    toDate(event_time) AS date,
    COUNT(DISTINCT user_id) AS dau
FROM events
WHERE event_time >= today() - 7
GROUP BY date
ORDER BY date;
```

#### 漏斗分析 (Funnel Analysis)
```sql
WITH
    step1 AS (SELECT DISTINCT user_id FROM events WHERE event_name = 'signup'),
    step2 AS (SELECT DISTINCT user_id FROM events WHERE event_name = 'purchase')
SELECT
    (SELECT COUNT(*) FROM step1) AS signup_users,
    (SELECT COUNT(*) FROM step2 WHERE user_id IN (SELECT user_id FROM step1)) AS purchase_users,
    purchase_users / signup_users AS conversion_rate;
```

#### N日留存 (Retention)
```sql
WITH
    cohort AS (
        SELECT user_id, toDate(MIN(event_time)) AS cohort_date
        FROM events
        GROUP BY user_id
    ),
    activity AS (
        SELECT user_id, toDate(event_time) AS activity_date
        FROM events
    )
SELECT
    cohort_date,
    COUNT(DISTINCT CASE WHEN dateDiff('day', cohort_date, activity_date) = 0 THEN c.user_id END) AS day0,
    COUNT(DISTINCT CASE WHEN dateDiff('day', cohort_date, activity_date) = 7 THEN c.user_id END) AS day7,
    day7 / day0 AS retention_7d
FROM cohort c
LEFT JOIN activity a ON c.user_id = a.user_id
GROUP BY cohort_date
ORDER BY cohort_date;
```
"""


def get_schema_context() -> str:
    """获取完整的 Schema 上下文，用于 LLM Prompt"""
    return FULL_SCHEMA_DOC


def get_business_term(term: str) -> str | None:
    """查询业务术语定义"""
    return BUSINESS_GLOSSARY.get(term)


def get_event_name(chinese_name: str) -> str | None:
    """将中文事件名映射为英文事件名"""
    return EVENT_NAME_MAPPING.get(chinese_name)
