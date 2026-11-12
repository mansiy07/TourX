
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  ShieldCheck,
  MapPin,
  Route,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  Navigation,
  Plus,
  Sun,
  Moon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Trips",
      value: "12",
      subtitle: "Journeys completed",
      icon: MapPin,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Safety Score",
      value: "94/100",
      subtitle: "Excellent safety level",
      icon: ShieldCheck,
      color: "text-teal-400",
      bg: "bg-teal-400/10",
    },
    {
      title: "Active Alerts",
      value: "02",
      subtitle: "Requires your attention",
      icon: AlertTriangle,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Distance Travelled",
      value: "248 km",
      subtitle: "Across all journeys",
      icon: Route,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  const activities = [
    {
      title: "Location monitoring started",
      detail: "Your location monitoring session is active.",
      time: "Today, 10:30 AM",
      icon: Navigation,
    },
    {
      title: "Safety check completed",
      detail: "Your recent safety check was completed.",
      time: "Today, 09:15 AM",
      icon: ShieldCheck,
    },
    {
      title: "Journey completed",
      detail: "Your previous trip was marked as completed.",
      time: "Yesterday, 05:45 PM",
      icon: MapPin,
    },
  ];

  const quickActions = [
    {
      title: "Start a Journey",
      description: "Begin monitoring your next trip.",
      icon: Navigation,
      action: () => navigate("/trips"),
    },
    {
      title: "Find Safe Routes",
      description: "Explore safer travel routes.",
      icon: Route,
      action: () => navigate("/safe-routes"),
    },
    {
      title: "Emergency SOS",
      description: "Open the emergency assistance page.",
      icon: AlertTriangle,
      action: () => navigate("/emergency"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main dashboard content */}
      <main className="min-h-screen lg:ml-72">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={23} />
            </button>

            <div>
              <h1 className="text-lg font-bold sm:text-xl">Dashboard</h1>
              <p className="text-xs text-slate-400 sm:text-sm">
                Your personal safety overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-white/10 p-2.5 text-slate-300 transition hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              className="relative rounded-xl border border-white/10 p-2.5 text-slate-300 transition hover:bg-slate-800"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal-400"></span>
            </button>

            <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-teal-400/10 font-bold text-teal-400 sm:flex">
              TU
            </div>
          </div>
        </header>

        <div className="space-y-8 p-5 sm:p-8">
          {/* Welcome section */}
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm text-teal-400">WELCOME BACK</p>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Hello, Traveler!
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Stay informed, stay prepared, and travel safely.
              </p>
            </div>

            <button
              onClick={() => navigate("/trips")}
              className="flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              <Plus size={19} />
              Plan a Journey
            </button>
          </section>

          {/* Live safety status */}
          <section className="rounded-2xl border border-teal-400/20 bg-gradient-to-r from-teal-950/70 to-slate-900 p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10">
                  <ShieldCheck size={30} className="text-teal-400" />
                </div>
                <div>
                  <p className="font-semibold">Safety Monitoring</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Your dashboard is ready for your next journey.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm text-teal-400 sm:self-center">
                <span className="h-2 w-2 rounded-full bg-teal-400"></span>
                System Ready
              </div>
            </div>
          </section>

          {/* Statistics cards */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">Safety Overview</h3>
              <span className="text-xs text-slate-500">Demo statistics</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-teal-400/30"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                        <Icon size={23} />
                      </div>
                      <ArrowUpRight size={19} className="text-slate-500" />
                    </div>

                    <p className="text-sm text-slate-400">{item.title}</p>
                    <h4 className="mt-2 text-2xl font-bold">{item.value}</h4>
                    <p className="mt-2 text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick actions */}
          <section>
            <h3 className="mb-5 text-lg font-bold">Quick Actions</h3>

            <div className="grid gap-5 md:grid-cols-3">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    onClick={item.action}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-left transition hover:border-teal-400/40 hover:bg-slate-800/80"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm text-slate-400">
                      {item.description}
                    </p>
                    <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-teal-400">
                      Explore <ArrowUpRight size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Recent activities */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Activities</h3>
              <Activity size={20} className="text-teal-400" />
            </div>

            <div className="space-y-6">
              {activities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.detail}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                        <Clock size={13} />
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Dashboard footer */}
          <footer className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
            Smart Tourist Safety | AI-Powered Tourist Protection System
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
