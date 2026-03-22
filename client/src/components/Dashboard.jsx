import React from "react";
import { formatNumber } from "../utils/helpers";

export default function Dashboard({ latest }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-slate-900">Latest prediction</div>
          <div className="text-xs text-slate-600">From the most recent entry</div>
        </div>
        {latest ? (
          <div
            className={`rounded-2xl border px-3 py-2 text-xs font-bold ${
              latest.alert
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {latest.alert ? "Alert Active" : "Normal"}
          </div>
        ) : null}
      </div>

      {!latest ? (
        <div className="rounded-xl border border-dashed bg-white p-4 text-sm text-slate-600">
          No entries yet. Add one on the Home page.
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <Stat label="Students" value={formatNumber(latest.students)} />
          <Stat
            label="Predicted food demand"
            value={formatNumber(latest.predictedFood, 0)}
            sub={
              latest.predictionSource === "fallback"
                ? "Baseline estimate (ML offline)"
                : latest.predictionSource === "ml"
                  ? "Random Forest (Flask)"
                  : null
            }
          />
          <Stat label="Food prepared" value={formatNumber(latest.foodPrepared)} />
          <Stat label="Food wasted" value={formatNumber(latest.foodWasted)} />

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-700">Waste %</div>
                <div className="mt-1 text-lg font-extrabold text-slate-900">
                  {formatNumber(latest.wastePercent, 1)}%
                </div>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                {latest.alert ? "High" : "OK"}
              </div>
            </div>
            <Progress value={Math.min(100, Number(latest.wastePercent) || 0)} alert={latest.alert} />
            <div className="mt-2 text-[11px] text-slate-500">
              Updated {new Date(latest.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="text-xs font-semibold text-slate-700">{label}</div>
      <div className="mt-1 text-lg font-bold text-slate-900">{value}</div>
      {sub ? <div className="mt-1 text-[11px] text-slate-500">{sub}</div> : null}
    </div>
  );
}

function Progress({ value, alert }) {
  return (
    <div className="mt-3">
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${
            alert ? "bg-red-500" : "bg-emerald-500"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

