import React from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/helpers";

export default function Alerts({ entries }) {
  const alerts = (entries || []).filter((e) => e.alert);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-slate-900">Alerts</div>
          <div className="text-xs text-slate-600">Waste above the configured threshold</div>
        </div>
        <div className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-extrabold text-red-700">
          {alerts.length} active
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          No alerts right now. Great job reducing waste.
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-bold text-slate-700">Action</div>
            <Link
              to="/map"
              className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700"
            >
              Request NGOs pickup
            </Link>
          </div>
          <div className="divide-y divide-slate-200">
          {alerts.slice(0, 6).map((a) => (
            <div key={a._id} className="flex items-start justify-between gap-3 px-3 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-500" />
                  <div className="truncate text-sm font-extrabold text-slate-900">
                    {formatNumber(a.foodWasted)} wasted
                  </div>
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Students {formatNumber(a.students)} · Prepared {formatNumber(a.foodPrepared)}
                </div>
                <div className="mt-1 text-xs font-semibold text-red-700">
                  Waste {formatNumber(a.wastePercent, 1)}%
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-slate-600">
                  {new Date(a.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  {new Date(a.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}

