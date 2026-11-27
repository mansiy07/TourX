
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  LocateFixed,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
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

// Update the map view when the user's location changes.
function MapUpdater({ position }) {
  const map = useMap();

  if (position) {
    map.setView(position, 13);
  }

  return null;
}

function SafeRoutes() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [start, setStart] = useState("Prayagraj");
  const [destination, setDestination] = useState("Varanasi");
  const [showRoute, setShowRoute] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [locationAccuracy, setLocationAccuracy] = useState(null);

  const startPosition = [25.4358, 81.8463];
  const destinationPosition = [25.3176, 82.9739];

  const routePositions = [
    startPosition,
    [25.405, 82.05],
    [25.36, 82.4],
    [25.34, 82.7],
    destinationPosition,
  ];

  const getCurrentLocation = () => {
    setLocationError("");
    setLocationMessage("");
    setLocationAccuracy(null);

    if (!navigator.geolocation) {
      setLocationError(t("geolocationNotSupported"));
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserLocation(coordinates);
        setStart(t("myCurrentLocation"));
        setShowRoute(false);
        setLocationLoading(false);

        const accuracy = Math.round(position.coords.accuracy);
        setLocationAccuracy(accuracy);
        setLocationMessage(t("locationDetected"));
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(t("locationPermissionDenied"));
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError(t("locationUnavailable"));
        } else if (error.code === error.TIMEOUT) {
          setLocationError(t("locationTimeout"));
        } else {
          setLocationError(t("locationDetectionFailed"));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!start.trim() || !destination.trim()) {
      return;
    }

    if (userLocation) {
      setShowRoute(false);
      setLocationMessage(t("actualRoutingPending"));
      return;
    }

    setShowRoute(true);
  };

  const mapCenter = userLocation || [25.38, 82.4];
  const markerPosition = userLocation || startPosition;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">
        <header className="flex h-20 items-center gap-4 border-b border-white/10 bg-slate-950 px-5 sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
            aria-label={t("openSidebar")}
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-xl font-bold">{t("safeRoutes")}</h1>
            <p className="text-xs text-slate-400">
              {t("safeRoutesSubtitle")}
            </p>
          </div>
        </header>

        <div className="space-y-7 p-5 sm:p-8">
          <section>
            <h2 className="text-2xl font-bold">
              {t("findYourSafeRoute")}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {t("safeRouteDescription")}
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
            <form
              onSubmit={handleSearch}
              className="grid gap-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("startingLocation")}
                </label>
                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    value={start}
                    onChange={(e) => {
                      setStart(e.target.value);
                      setUserLocation(null);
                      setLocationMessage("");
                      setLocationAccuracy(null);
                    }}
                    placeholder={t("enterStartingLocation")}
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-950 py-3.5 pl-12 pr-4 text-sm outline-none focus:border-teal-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 disabled:opacity-50"
                >
                  <LocateFixed size={17} />
                  {locationLoading
                    ? t("detectingLocation")
                    : t("useCurrentLocation")}
                </button>

                {locationError && (
                  <p className="mt-2 text-xs text-red-400">
                    {locationError}
                  </p>
                )}

                {locationMessage && (
                  <div className="mt-2 text-xs text-teal-400">
                    <p>{locationMessage}</p>
                    {locationAccuracy !== null && (
                      <p className="mt-1">
                        {t("locationAccuracy")}: {locationAccuracy} {t("metres")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t("destination")}
                </label>
                <div className="relative">
                  <Navigation
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"
                  />
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder={t("enterDestination")}
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
                  {t("findRoute")}
                </button>
              </div>
            </form>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <h3 className="font-bold">{t("liveMapView")}</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {userLocation
                      ? t("detectedCurrentLocation")
                      : t("demoRouteDescription")}
                  </p>
                </div>
                <MapPin size={21} className="text-teal-400" />
              </div>

              <div className="h-[420px] w-full">
                <MapContainer
                  center={mapCenter}
                  zoom={userLocation ? 13 : 8}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <MapUpdater position={userLocation} />

                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={markerPosition}>
                    <Popup>
                      {userLocation
                        ? t("yourCurrentLocation")
                        : t("startingPointPrayagraj")}
                    </Popup>
                  </Marker>

                  {!userLocation && (
                    <Marker position={destinationPosition}>
                      <Popup>{t("destinationVaranasi")}</Popup>
                    </Marker>
                  )}

                  {showRoute && !userLocation && (
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

            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-bold">{t("routeInformation")}</h3>
                  <Route size={21} className="text-teal-400" />
                </div>

                <div className="space-y-5">
                  <div className="flex gap-3">
                    <MapPin size={20} className="text-teal-400" />
                    <div>
                      <p className="text-xs text-slate-500">
                        {t("startingPoint").toUpperCase()}
                      </p>
                      <p className="mt-1 font-semibold">{start}</p>
                    </div>
                  </div>

                  <div className="ml-2 h-6 border-l border-dashed border-slate-600"></div>

                  <div className="flex gap-3">
                    <Navigation size={20} className="text-orange-400" />
                    <div>
                      <p className="text-xs text-slate-500">
                        {t("destination").toUpperCase()}
                      </p>
                      <p className="mt-1 font-semibold">{destination}</p>
                    </div>
                  </div>
                </div>

                {!userLocation && (
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-800 p-4">
                      <Clock size={19} className="text-teal-400" />
                      <p className="mt-3 text-xs text-slate-400">
                        {t("demoEstimatedTime")}
                      </p>
                      <p className="mt-1 font-bold">3 hr 30 min</p>
                    </div>

                    <div className="rounded-xl bg-slate-800 p-4">
                      <Route size={19} className="text-teal-400" />
                      <p className="mt-3 text-xs text-slate-400">
                        {t("demoDistance")}
                      </p>
                      <p className="mt-1 font-bold">120 km</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setUserLocation(null);
                    setStart("Prayagraj");
                    setDestination("Varanasi");
                    setShowRoute(true);
                    setLocationMessage("");
                    setLocationError("");
                    setLocationAccuracy(null);
                  }}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 py-3 font-bold text-slate-950 transition hover:bg-teal-300"
                >
                  {t("showDemoRoute")} <ArrowRight size={18} />
                </button>
              </div>

              <div className="rounded-2xl border border-teal-400/20 bg-teal-400/5 p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={24} className="text-teal-400" />
                  <h3 className="font-bold">{t("safetyInsights")}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {t("routeSafetyPending")}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-orange-400">
                  <AlertTriangle size={16} />
                  {t("safetyScoreUnavailable")}
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
