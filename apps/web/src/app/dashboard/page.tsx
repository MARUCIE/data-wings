"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { api, type OverviewData } from "@/lib/api";

/** Time range options */
const TIME_RANGES = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 14 days", value: 14 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 },
];

/** Format number with K/M suffix */
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

/** Format date for display */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Metric Card Component */
function MetricCard({
  title,
  value,
  change,
  loading,
  icon,
}: {
  title: string;
  value: string | number;
  change?: number;
  loading?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          {loading ? (
            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded mt-2" />
          ) : (
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          )}
          {change !== undefined && !loading && (
            <p
              className={`text-sm mt-1 flex items-center gap-1 ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <span>{change >= 0 ? "+" : ""}{change.toFixed(1)}%</span>
              <span className="text-slate-400">vs last period</span>
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/** Simple Bar Chart Component */
function BarChart({
  data,
  xKey,
  yKey,
  loading,
}: {
  data: Array<Record<string, unknown>>;
  xKey: string;
  yKey: string;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="h-64 flex items-end gap-2 px-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-slate-200 animate-pulse rounded-t"
            style={{ height: `${Math.random() * 60 + 20}%` }}
          />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => Number(d[yKey]) || 0));

  return (
    <div className="h-64 flex items-end gap-2 px-4">
      {data.slice(0, 10).map((item, i) => {
        const value = Number(item[yKey]) || 0;
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;

        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1 group"
          >
            <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatNumber(value)}
            </span>
            <div
              className="w-full bg-primary-500 rounded-t transition-all hover:bg-primary-600 cursor-pointer"
              style={{ height: `${height}%`, minHeight: "4px" }}
              title={`${item[xKey]}: ${formatNumber(value)}`}
            />
            <span className="text-xs text-slate-500 truncate w-full text-center">
              {String(item[xKey]).slice(0, 8)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Line Chart Component (simple SVG) */
function LineChart({
  data,
  xKey,
  yKey,
  loading,
}: {
  data: Array<Record<string, unknown>>;
  xKey: string;
  yKey: string;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="h-64 bg-slate-100 animate-pulse rounded" />
    );
  }

  if (!data.length) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        <p>No data available</p>
      </div>
    );
  }

  const values = data.map((d) => Number(d[yKey]) || 0);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue || 1;

  const width = 400;
  const height = 200;
  const padding = 20;

  const points = data.map((_, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - 2 * padding);
    const y =
      height -
      padding -
      ((values[i] - minValue) / range) * (height - 2 * padding);
    return `${x},${y}`;
  });

  const pathD = points.length > 1 ? `M ${points.join(" L ")}` : "";

  // Create area path for gradient fill
  const areaD = points.length > 1
    ? `M ${padding},${height - padding} L ${points.join(" L ")} L ${width - padding},${height - padding} Z`
    : "";

  return (
    <div className="h-64 flex flex-col">
      <svg viewBox={`0 0 ${width} ${height}`} className="flex-1">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            y1={padding + ratio * (height - 2 * padding)}
            x2={width - padding}
            y2={padding + ratio * (height - 2 * padding)}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={areaD} fill="url(#areaGradient)" />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((item, i) => {
          const x =
            padding + (i / (data.length - 1 || 1)) * (width - 2 * padding);
          const y =
            height -
            padding -
            ((values[i] - minValue) / range) * (height - 2 * padding);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="white"
                stroke="#2563eb"
                strokeWidth="2"
                className="cursor-pointer hover:r-6"
              />
              <title>
                {formatDate(String(item[xKey]))}: {formatNumber(values[i])}
              </title>
            </g>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between px-4 text-xs text-slate-500">
        <span>{formatDate(String(data[0]?.[xKey] || ""))}</span>
        <span>{formatDate(String(data[data.length - 1]?.[xKey] || ""))}</span>
      </div>
    </div>
  );
}

/** Dashboard Page */
export default function DashboardPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState(7);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - timeRange);

    const response = await api.analytics.overview(
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0]
    );

    if (response.status === "error") {
      setError(response.message || "Failed to load data");
      setLoading(false);
      return;
    }

    setData(response.data?.data || null);
    setLastUpdated(new Date());
    setLoading(false);
  }, [timeRange]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        loadData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [loadData, loading]);

  // Calculate metrics
  const totalUsers = data?.dau?.reduce((sum, d) => sum + (d.dau || 0), 0) || 0;
  const totalEvents =
    data?.event_counts?.reduce((sum, d) => sum + (d.count || 0), 0) || 0;
  const avgDAU = data?.dau?.length
    ? Math.round(totalUsers / data.dau.length)
    : 0;
  const eventTypes = data?.event_counts?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DW</span>
                </div>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500">
                  {data?.time_range
                    ? `${formatDate(data.time_range.start_date)} - ${formatDate(data.time_range.end_date)}`
                    : `Last ${timeRange} days`}
                  {lastUpdated && (
                    <span className="ml-2 text-slate-400">
                      Updated {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {TIME_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              {/* Refresh Button */}
              <button
                onClick={loadData}
                disabled={loading}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh data"
              >
                <svg
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              {/* Ask AI Button */}
              <Link
                href="/ask"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Ask AI
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3 text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={loadData}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Events"
            value={formatNumber(totalEvents)}
            loading={loading}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <MetricCard
            title="Unique Users"
            value={formatNumber(totalUsers)}
            loading={loading}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <MetricCard
            title="Avg. DAU"
            value={formatNumber(avgDAU)}
            loading={loading}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <MetricCard
            title="Event Types"
            value={eventTypes}
            loading={loading}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DAU Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Daily Active Users
              </h2>
              <span className="text-xs text-slate-400">
                {data?.dau?.length || 0} data points
              </span>
            </div>
            <LineChart
              data={data?.dau || []}
              xKey="date"
              yKey="dau"
              loading={loading}
            />
          </div>

          {/* Events by Type Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Events by Type
              </h2>
              <span className="text-xs text-slate-400">
                Top {Math.min(data?.event_counts?.length || 0, 10)} events
              </span>
            </div>
            <BarChart
              data={data?.event_counts || []}
              xKey="event_name"
              yKey="count"
              loading={loading}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
          <h3 className="text-sm font-medium text-slate-700 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ask"
              className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Ask a question about this data
            </Link>
            <button
              onClick={() => {
                // Export functionality placeholder
                alert("Export feature coming soon!");
              }}
              className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Export to CSV
            </button>
            <button
              onClick={() => {
                // Share functionality placeholder
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Share Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
