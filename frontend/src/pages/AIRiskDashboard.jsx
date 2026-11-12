
import { useState } from "react";
import {
  Menu,
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
  Activity,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown,
  Radio,
  Eye,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function AIRiskDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("24 Hours");

  // Demo risk indicators for the dashboard.
  const riskFactors = [
    {
      name: "Location Risk",
      description: "Based on the selected demo location",
      level: "Medium",
      percentage: 65,
      color: "bg-orange-400",
    },
    {
      name: "Route Deviation",
      description: "Unexpected movement from the planned route",
      level: "Low",
      percentage: 25,
      color: "bg-teal-400",
    },
    {
      name: "Environmental Risk",
      description: "Weather and surrounding conditions",
      level: "Medium",
      percentage: 55,
      color: "bg-orange-400",
    },
    {
      name: "Activity Anomaly",
      description: "Unusual activity pattern detection",
      level: "Low",
      percentage: 18,
      color: "bg-teal-400",
    },
  ];

  // Demo alerts for the interface.
  const alerts = [
    {
      id: 1,
      title: "Moderate Location Risk",
      message: "A selected demo area has a moderate risk indicator.",
      time: "10 minutes ago",
      type: "warning",
    },
    {
      id: 2,
      title: "Route Monitoring Active",
      message: "The demo route monitoring interface is active.",
      time: "35 minutes ago",
      type: "info",
    },
    {
      id: 3,
      title: "No Anomaly Detected",
      message: "No anomaly is recorded in the sample data.",
      time: "1 hour ago",
      type: "success",
    },
  ];

  const riskColor = (level) => {
    if (level === "High") return "text-red-400 bg-red-400/10";
    if (level === "Medium") return "text-orange-400 bg-orange-400/10";
    return "text-teal-400 bg-teal-400/10";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">
        {/* Page header */}
        <header className="flex min-h-20 items-center justify-between gap-4 border-b border-white/10 bg-slate-950 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold">AI Risk Dashboard</h1>
              <p className="text-xs text-slate-400">
                Tourist safety intelligence and risk monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs text-teal-400">
            <BrainCircuit size={15} />
            AI Demo
          </div>
        </header>

        <div className="space-y-7 p-5 sm:p-8">
          {/* Introduction */}
          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-widest text-teal-400">
                INTELLIGENT SAFETY MONITORING
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl">
                AI Safety Overview
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Monitor safety indicators, review risk signals, and understand
                potential travel anomalies.
              </p>
            </div>

            <button
              onClick={() => setSelectedPeriod("24 Hours")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300 transition hover:border-teal-400/40"
            >
              <RefreshCw size={16} />
              Reset View
            </button>
          </section>

          {/* Overall risk overview */}
          <section className="grid gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-950/40 to-slate-900 p-6 xl:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-300">
                  Overall Demo Risk
                </p>
                <AlertTriangle size={21} className="text-orange-400" />
              </div>

              <div className="mt-7 flex items-center justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-orange-400/20">
                  <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-orange-400 border-r-orange-400 rotate-45"></div>
                  <div className="text-center">
                    <p className="text-4xl font-black">52</p>
                    <p className="mt-1 text-xs text-slate-400">Out of 100</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="rounded-full bg-orange-400/10 px-4 py-2 text-sm font-bold text-orange-400">
                  Moderate Risk
                </span>
                <p className="mt-4 text-xs leading-5 text-slate-400">
                  Illustrative demo score. This is not a real AI prediction
                  or verified assessment of your current safety.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-teal-400/10 p-3 text-teal-400">
                    <ShieldCheck size={23} />
                  </div>
                  <span className="text-xs text-slate-500">Demo data</span>
                </div>
                <h3 className="mt-5 text-3xl font-bold">02</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Active Safety Indicators
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-teal-400">
                  <Activity size={15} />
                  Sample monitoring data
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-red-400/10 p-3 text-red-400">
                    <AlertTriangle size={23} />
                  </div>
                  <span className="text-xs text-slate-500">Demo data</span>
                </div>
                <h3 className="mt-5 text-3xl font-bold">01</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Warning Indicators
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-orange-400">
                  <TrendingUp size={15} />
                  Illustrative warning count
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-blue-400/10 p-3 text-blue-400">
                    <Radio size={23} />
                  </div>
                  <span className="text-xs text-slate-500">Demo data</span>
                </div>
                <h3 className="mt-5 text-3xl font-bold">Active</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Monitoring Interface
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  Live sensor connection pending
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-purple-400/10 p-3 text-purple-400">
                    <Eye size={23} />
                  </div>
                  <span className="text-xs text-slate-500">Demo data</span>
                </div>
                <h3 className="mt-5 text-3xl font-bold">00</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Sample Anomaly Events
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs text-teal-400">
                  <TrendingDown size={15} />
                  No sample anomaly recorded
                </p>
              </div>
            </div>
          </section>

          {/* Risk factor analysis */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold">Risk Factor Analysis</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Illustrative values for different safety indicators.
                </p>
              </div>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-teal-400"
              >
                <option>24 Hours</option>
                <option>7 Days</option>
                <option>30 Days</option>
              </select>
            </div>

            <div className="space-y-7">
              {riskFactors.map((factor) => (
                <div key={factor.name}>
                  <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm font-semibold">{factor.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {factor.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">
                        {factor.percentage}%
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${riskColor(
                          factor.level
                        )}`}
                      >
                        {factor.level}
                      </span>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${factor.color}`}
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent alerts */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">Recent Safety Alerts</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Example events generated for the demo interface.
                </p>
              </div>
              <Clock size={21} className="text-teal-400" />
            </div>

            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-950 p-4 sm:flex-row sm:items-center"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      alert.type === "warning"
                        ? "bg-orange-400/10 text-orange-400"
                        : alert.type === "success"
                        ? "bg-teal-400/10 text-teal-400"
                        : "bg-blue-400/10 text-blue-400"
                    }`}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle size={21} />
                    ) : alert.type === "success" ? (
                      <ShieldCheck size={21} />
                    ) : (
                      <Activity size={21} />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {alert.message}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {alert.time}
                    </p>
                  </div>

                  <ChevronRight
                    size={19}
                    className="hidden text-slate-500 sm:block"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Monitoring information */}
          <section className="rounded-2xl border border-teal-400/20 bg-teal-400/5 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-teal-400/10 p-3 text-teal-400">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h3 className="font-bold">AI Monitoring Information</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  The planned AI service will analyze location risk,
                  route deviations, unusual activity patterns, and
                  emergency message classifications. Risk scores will
                  provide advisory information and will not confirm an
                  emergency.
                </p>
                <p className="mt-3 text-xs font-semibold text-teal-400">
                  AI service integration: Pending
                </p>
              </div>
            </div>
          </section>

          <p className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
            Frontend demonstration only. No real-time AI model or location
            monitoring is connected.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AIRiskDashboard;
