import React, { useEffect, useState } from "react";
import Alerts from "../components/Alerts";
import Charts from "../components/Charts";
import { getFoodEntries, getFoodStatsSummary } from "../services/api";

export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getFoodEntries();
        setEntries(data);
      } catch {
        setEntries([]);
      }
      try {
        const summary = await getFoodStatsSummary();
        setStats(summary);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-5 grid gap-4 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-2xl border bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Waste analytics dashboard
          </div>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Trends & Alerts
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Analytics, waste trends, and alerts {loading ? " (loading...)" : ""}
          </p>
          {stats && !loading ? (
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
                {stats.totalEntries} entries
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-semibold text-slate-700">
                {stats.alertEntries} alerts
              </span>
              {stats.avgWastePercent != null ? (
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700">
                  Avg waste {stats.avgWastePercent}%
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="relative hidden md:block">
          <div className="absolute -right-10 -top-8 h-48 w-48 rounded-full bg-emerald-200/40 blur-2xl" />
          <img
            alt="Food waste illustration"
            src="/assets/hero-food.svg"
            className="rounded-2xl border border-slate-200 bg-white animate-floaty"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Charts entries={entries} />
        <Alerts entries={entries} />
      </div>
    </div>
  );
}

