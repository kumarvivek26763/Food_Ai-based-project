import React, { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

function shortTimeLabel(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function Charts({ entries }) {
  const data = useMemo(() => {
    return (entries || [])
      .slice()
      .reverse()
      .slice(-20)
      .map((e) => ({
        name: shortTimeLabel(e.createdAt),
        prepared: Number(e.foodPrepared),
        wasted: Number(e.foodWasted),
        predicted: Number(e.predictedFood),
        wastePercent: Number(e.wastePercent)
      }));
  }, [entries]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-2">
        <div className="text-sm font-extrabold text-slate-900">Analytics</div>
        <div className="text-xs text-slate-600">Last 20 entries</div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            />
            <Legend />
            <Line type="monotone" dataKey="prepared" stroke="#0f172a" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="wasted" stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

