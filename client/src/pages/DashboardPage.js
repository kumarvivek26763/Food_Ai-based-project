import React, { useEffect, useState } from "react";
import Alerts from "../components/Alerts";
import Charts from "../components/Charts";
import { getFoodEntries } from "../services/api";

export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getFoodEntries();
        setEntries(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-2xl border bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Waste analytics dashboard
        </div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
          Trends & Alerts
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Analytics, waste trends, and alerts {loading ? " (loading...)" : ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Charts entries={entries} />
        <Alerts entries={entries} />
      </div>
    </div>
  );
}

