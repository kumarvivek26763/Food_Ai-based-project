import   { useEffect, useState } from "react";
import FoodForm from "../components/FoodForm";
import Dashboard from "../components/Dashboard";
import { getFoodEntries } from "../services/api";
import HomeDescription from "../components/HomeDescription";
import ProgramCard from "../components/ProgramCard";
import BlogSection from "../components/BlogSection";
import HeroSlider from "../components/HeroSlider";
// import WastManagment from "../components/WastManagment";
 



export default function WastManagment() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    async function refresh() {
        setLoading(true);
        try {
            const data = await getFoodEntries();
            setEntries(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    const latest = entries[0];
    return (
        <div className="mx-auto max-w-6xl px-4 py-6">
            <div className="mb-5">
                <div className="inline-flex items-center gap-2 rounded-2xl border bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Real-time predictions + waste alerts
                </div>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    Smart Food Waste Management
                </h1>
                <p className="mt-2 text-sm text-slate-600 md:text-base">
                    Enter students, food prepared, and wasted. The system predicts demand using an AI model and flags excess waste for action.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                    <FoodForm
                        onCreated={(created) => {
                            setEntries((prev) => [created, ...prev]);
                        }}
                    />

                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-extrabold text-slate-900">How it works</div>
                                <div className="mt-1 text-xs text-slate-600">
                                    React → Express API → MongoDB + Flask ML → prediction → UI analytics
                                </div>
                            </div>
                            <button
                                onClick={refresh}
                                className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Refreshing..." : "Refresh"}
                            </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <Pill text="Prediction via RandomForest" />
                            <Pill text="Waste % + threshold alerts" />
                            <Pill text="Dashboard charts" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Dashboard latest={latest} />

                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-extrabold text-slate-900">Recent entries</div>
                                <div className="mt-1 text-xs text-slate-600">
                                    Latest submissions from your canteen/hostel
                                </div>
                            </div>
                            <div className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                {entries.length} total
                            </div>
                        </div>

                        <div className="mt-3 divide-y rounded-xl border border-slate-200 bg-white">
                            {entries.slice(0, 5).map((e) => (
                                <div key={e._id} className="flex items-start justify-between gap-3 px-3 py-3">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            {e.students} students
                                        </div>
                                        <div className="mt-1 text-xs text-slate-600">
                                            Prepared {e.foodPrepared} · Wasted {e.foodWasted}
                                        </div>
                                        <div className="mt-1 text-xs text-emerald-700">
                                            Predicted demand: {Math.round(e.predictedFood)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-semibold text-slate-700">
                                            {new Date(e.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </div>
                                        <div className="mt-1 text-[11px] text-slate-500">
                                            {new Date(e.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="mt-2">
                                            {e.alert ? <Badge kind="danger" text="Alert" /> : <Badge kind="ok" text="Normal" />}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {entries.length === 0 ? (
                                <div className="px-3 py-6 text-center text-sm text-slate-500">
                                    No data yet. Submit your first entry.
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center gap-3">
                        <div className="animate-floaty h-11 w-11 rounded-2xl bg-emerald-600/15 flex items-center justify-center text-emerald-700 font-extrabold">
                            AI
                        </div>
                        <div>
                            <div className="text-sm font-extrabold text-slate-900">Predict demand</div>
                            <div className="text-xs text-slate-600">Random Forest uses students count</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-sky-600/15 flex items-center justify-center text-sky-700 font-extrabold">
                            %
                        </div>
                        <div>
                            <div className="text-sm font-extrabold text-slate-900">Track waste</div>
                            <div className="text-xs text-slate-600">Waste % + threshold alerts</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur overflow-hidden transition-transform hover:-translate-y-0.5">
                    <div className="flex items-center gap-3">
                        <img
                            alt="NGO map illustration"
                            src="/assets/ngo-map.svg"
                            className="h-11 w-11 rounded-2xl animate-gradient-shift object-cover"
                        />
                        <div>
                            <div className="text-sm font-extrabold text-slate-900">Redistribute</div>
                            <div className="text-xs text-slate-600">Optional NGO pickup request</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


function Pill({ text }) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
      {text}
    </div>
  );
}

function Badge({ kind, text }) {
  const cls =
    kind === "danger"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";
  return <div className={`rounded-xl border px-3 py-1 text-xs font-bold ${cls}`}>{text}</div>;
}

