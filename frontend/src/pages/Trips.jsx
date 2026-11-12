
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  MapPin,
  CalendarDays,
  Clock,
  Navigation,
  Search,
  Filter,
  ArrowRight,
  Route,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function Trips() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([
    {
      id: 1,
      destination: "Taj Mahal, Agra",
      start: "Agra, Uttar Pradesh",
      date: "15 November 2026",
      time: "09:00 AM",
      status: "Completed",
      distance: "12 km",
    },
    {
      id: 2,
      destination: "India Gate, New Delhi",
      start: "Noida, Uttar Pradesh",
      date: "20 November 2026",
      time: "08:30 AM",
      status: "Upcoming",
      distance: "35 km",
    },
    {
      id: 3,
      destination: "Varanasi Ghats",
      start: "Prayagraj, Uttar Pradesh",
      date: "25 November 2026",
      time: "06:00 AM",
      status: "Upcoming",
      distance: "120 km",
    },
  ]);

  const [newTrip, setNewTrip] = useState({
    destination: "",
    start: "",
    date: "",
    time: "",
  });

  // Add a new trip to the displayed trip list.
  const handleSubmit = (e) => {
    e.preventDefault();

    const trip = {
      id: Date.now(),
      destination: newTrip.destination,
      start: newTrip.start,
      date: newTrip.date,
      time: newTrip.time,
      status: "Upcoming",
      distance: "Not calculated",
    };

    setTrips((prev) => [trip, ...prev]);
    setNewTrip({ destination: "", start: "", date: "", time: "" });
    setShowForm(false);
  };

  const filteredTrips = trips.filter((trip) =>
    `${trip.destination} ${trip.start}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">
        {/* Page header */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950 px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              aria-label="Open sidebar"
            >
              <Navigation size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold">My Trips</h1>
              <p className="text-xs text-slate-400">
                Manage and monitor your journeys
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-xl bg-teal-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Plan New Trip</span>
            <span className="sm:hidden">New Trip</span>
          </button>
        </header>

        <div className="space-y-7 p-5 sm:p-8">
          {/* Welcome banner */}
          <section className="rounded-2xl border border-teal-400/20 bg-gradient-to-r from-teal-950/70 to-slate-900 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-400">
                <Route size={30} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Journeys</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Plan your travel and keep your journeys organized.
                </p>
              </div>
            </div>
          </section>

          {/* Trip statistics */}
          <section className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "Total Trips",
                value: trips.length,
                color: "text-blue-400",
              },
              {
                label: "Upcoming Trips",
                value: trips.filter((trip) => trip.status === "Upcoming").length,
                color: "text-teal-400",
              },
              {
                label: "Completed Trips",
                value: trips.filter((trip) => trip.status === "Completed").length,
                color: "text-purple-400",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-slate-900 p-5"
              >
                <p className="text-sm text-slate-400">{item.label}</p>
                <h3 className={`mt-2 text-3xl font-bold ${item.color}`}>
                  {item.value}
                </h3>
              </div>
            ))}
          </section>

          {/* Search and filters */}
          <section className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destination or starting point..."
                className="w-full rounded-xl border border-white/10 bg-slate-900 py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
              />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-400">
              <Filter size={18} />
              All Trips
            </div>
          </section>

          {/* Trip list */}
          <section>
            <h3 className="mb-5 text-lg font-bold">Your Travel History</h3>

            <div className="space-y-4">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-teal-400/30 sm:p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold">{trip.destination}</h4>
                          <p className="mt-1 text-sm text-slate-400">
                            From: {trip.start}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays size={14} />
                              {trip.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={14} />
                              {trip.time}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Route size={14} />
                              {trip.distance}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 md:justify-end">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            trip.status === "Completed"
                              ? "bg-purple-400/10 text-purple-400"
                              : "bg-teal-400/10 text-teal-400"
                          }`}
                        >
                          {trip.status}
                        </span>

                        <button
                          onClick={() => navigate("/safe-routes")}
                          className="flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300"
                        >
                          View <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-10 text-center">
                  <MapPin size={35} className="mx-auto mb-3 text-slate-500" />
                  <p className="font-semibold">No trips found</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Try searching for another destination.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* New trip form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Plan a New Trip</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Enter your journey details.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm">Starting Location</label>
                <input
                  type="text"
                  value={newTrip.start}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, start: e.target.value })
                  }
                  placeholder="Enter starting location"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">Destination</label>
                <input
                  type="text"
                  value={newTrip.destination}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, destination: e.target.value })
                  }
                  placeholder="Enter destination"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm">Travel Date</label>
                  <input
                    type="date"
                    value={newTrip.date}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">Travel Time</label>
                  <input
                    type="time"
                    value={newTrip.time}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, time: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 py-3.5 font-bold text-slate-950 transition hover:bg-teal-300"
              >
                <Plus size={19} />
                Create Trip
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trips;
