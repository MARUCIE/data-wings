"use client";

import { useEffect, useState } from "react";
import { api, type OverviewData } from "@/lib/api";

/** Format number with K/M suffix */
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

/** Metric Card Component */
function MetricCard({
  title,
  value,
  change,
  loading,
}: {
  title: string;
  value: string | number;
  change?: number;
  loading?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      {loading ? (
        <div className="h-8 w-20 bg-slate-200 animate-pulse rounded mt-2" />
      ) : (
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
      )}
      {change !== undefined && !loading && (
        <p
          className={`text-sm mt-1 ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(1)}% vs last period
        </p>
      )}
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
      <div className="h-64 flex items-center justify-center text-slate-400">
        No data available
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
            className="flex-1 flex flex-col items-center gap-1"
          >
            <span className="text-xs text-slate-500">
              {formatNumber(value)}
            </span>
            <div
              className="w-full bg-primary-500 rounded-t transition-all hover:bg-primary-600"
              style={{ height: `${height}%`, minHeight: "4px" }}
              title={`${item[xKey]}: ${value}`}
            />
            <span className="text-xs text-slate-500 truncate w-full text-center">
              {String(item[xKey]).slice(-5)}
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
      <div className="h-64 flex items-center justify-center text-slate-400">
        No data available
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

  return (
    <div className="h-64 flex flex-col">
      <svg viewBox={`0 0 ${width} ${height}`} className="flex-1">
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
        {data.map((_, i) => {
          const x =
            padding + (i / (data.length - 1 || 1)) * (width - 2 * padding);
          const y =
            height -
            padding -
            ((values[i] - minValue) / range) * (height - 2 * padding);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#2563eb"
              className="hover:fill-primary-700"
            >
              <title>
                {String(data[i][xKey])}: {values[i]}
              </title>
            </circle>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between px-4 text-xs text-slate-500">
        <span>{String(data[0]?.[xKey] || "").slice(-5)}</span>
        <span>{String(data[data.length - 1]?.[xKey] || "").slice(-5)}</span>
      </div>
    </div>
  );
}

/** Dashboard Page */
export default function DashboardPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      const response = await api.analytics.overview();

      if (response.status === "error") {
        setError(response.message || "Failed to load data");
        setLoading(false);
        return;
      }

      setData(response.data?.data || null);
      setLoading(false);
    }

    loadData();
  }, []);

  // Calculate metrics
  const totalUsers = data?.dau?.reduce((sum, d) => sum + (d.dau || 0), 0) || 0;
  const totalEvents =
    data?.event_counts?.reduce((sum, d) => sum + (d.count || 0), 0) || 0;
  const avgDAU = data?.dau?.length
    ? Math.round(totalUsers / data.dau.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">
                {data?.time_range
                  ? `${data.time_range.start_date} - ${data.time_range.end_date}`
                  : "Last 7 days"}
              </p>
            </div>
            <a
              href="/ask"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Ask AI
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Events"
            value={formatNumber(totalEvents)}
            loading={loading}
          />
          <MetricCard
            title="Unique Users"
            value={formatNumber(totalUsers)}
            loading={loading}
          />
          <MetricCard
            title="Avg. DAU"
            value={formatNumber(avgDAU)}
            loading={loading}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DAU Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Daily Active Users
            </h2>
            <LineChart
              data={data?.dau || []}
              xKey="date"
              yKey="dau"
              loading={loading}
            />
          </div>

          {/* Events by Type Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Events by Type
            </h2>
            <BarChart
              data={data?.event_counts || []}
              xKey="event_name"
              yKey="count"
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
