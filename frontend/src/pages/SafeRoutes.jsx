
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Clock,
  Route,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import Sidebar from "../components/Sidebar";
import "leaflet/dist/leaflet.css";

// Configure default Leaflet marker icons.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function SafeRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [start, setStart] = useState("Prayagraj");
  const [destination, setDestination] = useState("Varanasi");
  const [showRoute, setShowRoute] = useState(false);

  // Demo coordinates for the map.
  const startPosition = [25.4358, 81.8463];
  const destinationPosition = [25.3176, 82.9739];

  const routePositions = [
    startPosition,
    [25.405, 82.05],
    [25.36, 82.4],
    [25.34, 82.7],
    destinationPosition,
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (start.trim() && destination.trim()) {
      setShowRoute(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">
        {/* Page header */}
        <header className="flex h-20 items-center gap-4 border-b border-white/10 bg-slate-950 px-5 sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-xl font-bold">Safe Routes</h1>
            <p className="text-xs text-slate-400">
              Explore your journey with safety insights
            </p>
          </div>
        </header>

        <div className="space-y-7 p-5 sm:p-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold">Find Your Safe Route</h2>
            <p className="mt-2 text-sm text-slate-400">
              Plan your journey and explore location-based safety information.
            </p>
          </section>

          {/* Route search form */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
            <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Starting Location
                </label>
                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    placeholder="Enter starting location"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Destination
                </label>
                <div className="relative">
                  <Navigation
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-teal-300 md:w-auto"
                >
                  <Search size={19} />
                  Find Route
                </button>
              </div>
            </form>
          </section>

          {/* Map and route information */}
          <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <h3 className="font-bold">Live Map View</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Demo route: Prayagraj to Varanasi
                  </p>
                </div>
                <MapPin size={21} className="text-teal-400" />
              </div>

              <div className="h-[420px] w-full">
                <MapContainer
                  center={[25.38, 82.4]}
                  zoom={8}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={startPosition}>
                    <Popup>Starting Point: Prayagraj</Popup>
                  </Marker>

                  <Marker position={destinationPosition}>
                    <Popup>Destination: Varanasi</Popup>
                  </Marker>

                  {showRoute && (
                    <Polyline
                      positions={routePositions}
                      pathOptions={{
                        color: "#14b8a6",
                        weight: 5,
                      }}
                    />
                  )}
                </MapContainer>
              </div>
            </div>

            {/* Route details */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-bold">Route Information</h3>
                  <Route size={21} className="text-teal-400" />
                </div>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <MapPin size={20} className="text-teal-400" />
                    <div>
                      <p className="text-xs text-slate-500">STARTING POINT</p>
                      <p className="mt-1 font-semibold">{start}</p>
                    </div>
                  </div>

                  <div className="ml-2 h-6 border-l border-dashed border-slate-600"></div>

                  <div className="flex gap-3">
                    <Navigation size={20} className="text-orange-400" />
                    <div>
                      <p className="text-xs text-slate-500">DESTINATION</p>
                      <p className="mt-1 font-semibold">{destination}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-800 p-4">
                    <Clock size={19} className="text-teal-400" />
                    <p className="mt-3 text-xs text-slate-400">Estimated Time</p>
                    <p className="mt-1 font-bold">3 hr 30 min</p>
                  </div>

                  <div className="rounded-xl bg-slate-800 p-4">
                    <Route size={19} className="text-teal-400" />
                    <p className="mt-3 text-xs text-slate-400">Distance</p>
                    <p className="mt-1 font-bold">120 km</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowRoute(true)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 py-3 font-bold text-slate-950 transition hover:bg-teal-300"
                >
                  Show Demo Route <ArrowRight size={18} />
                </button>
              </div>

              {/* Safety information */}
              <div className="rounded-2xl border border-teal-400/20 bg-teal-400/5 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={24} className="text-teal-400" />
                  <h3 className="font-bold">Safety Insights</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Route safety analysis will be available after integrating
                  the AI risk prediction service and location-based data.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-orange-400">
                  <AlertTriangle size={16} />
                  Safety score is not available yet.
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SafeRoutes;
