import React, { useMemo, useState } from "react";
import { createFoodEntry } from "../services/api";
import { clampNonNegative, formatNumber } from "../utils/helpers";

export default function FoodForm({ onCreated }) {
  const [students, setStudents] = useState(120);
  const [foodPrepared, setFoodPrepared] = useState(130);
  const [foodWasted, setFoodWasted] = useState(15);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    const s = clampNonNegative(students);
    const p = clampNonNegative(foodPrepared);
    const w = clampNonNegative(foodWasted);
    return s > 0 && p >= 0 && w >= 0;
  }, [students, foodPrepared, foodWasted]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const created = await createFoodEntry({
        students: clampNonNegative(students),
        foodPrepared: clampNonNegative(foodPrepared),
        foodWasted: clampNonNegative(foodWasted)
      });
      onCreated?.(created);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-slate-900">New entry</div>
          <div className="text-xs text-slate-600">Save your values and get an AI prediction</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />{" "}
          Ready
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Field
          label="Students count"
          value={students}
          onChange={setStudents}
          hint="Used for AI demand prediction"
        />
        <Field
          label="Food prepared"
          value={foodPrepared}
          onChange={setFoodPrepared}
          hint="Total quantity prepared"
        />
        <Field
          label="Food wasted"
          value={foodWasted}
          onChange={setFoodWasted}
          hint="Leftover / discarded"
        />
      </div>

      {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-600">
          Tip: values are validated and the result updates instantly.
        </div>
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save & Predict"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        step={1}
        value={value}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-emerald-200 focus:ring-2"
        placeholder="0"
      />
      <div className="mt-1 text-xs text-slate-500">
        {hint} · Current: <span className="font-medium">{formatNumber(value)}</span>
      </div>
    </div>
  );
}

