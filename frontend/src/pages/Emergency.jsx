
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  ShieldAlert,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  User,
  Plus,
  Siren,
  Pencil,
  Trash2,
  X,
  Users,
  Navigation,
  RefreshCw,
  LocateFixed,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const initialContacts = [
  {
    id: 1,
    name: "Emergency Contact 1",
    phone: "+91 98765 43210",
    relationship: "Family",
  },
];

function Emergency() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem("emergencyContacts");
      return saved ? JSON.parse(saved) : initialContacts;
    } catch {
      return initialContacts;
    }
  });

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "Family",
  });

  const [showContactForm, setShowContactForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("not-requested");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError(t("geolocationNotSupported"));
      return;
    }

    setLocationStatus("loading");
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(position.timestamp).toLocaleString(),
        });
        setLocationStatus("success");
      },
      (error) => {
        setLocationStatus("error");

        const messages = {
          1: t("locationPermissionDenied"),
          2: t("locationUnavailable"),
          3: t("locationTimeout"),
        };

        setLocationError(
          messages[error.code] || t("locationDetectionFailed")
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // This is a demo SOS action. It does not send a real emergency alert.
  const activateSOS = () => {
    setSosActive(true);
    getCurrentLocation();
  };

  const resetSOS = () => {
    setSosActive(false);
  };

  const closeContactForm = () => {
    setNewContact({
      name: "",
      phone: "",
      relationship: "Family",
    });
    setEditingId(null);
    setShowContactForm(false);
  };

  const openAddForm = () => {
    setNewContact({
      name: "",
      phone: "",
      relationship: "Family",
    });
    setEditingId(null);
    setShowContactForm(true);
  };

  const handleSaveContact = (event) => {
    event.preventDefault();

    const cleanedPhone = newContact.phone.replace(/[\s-]/g, "");

    if (!/^\+?[0-9]{10,15}$/.test(cleanedPhone)) {
      alert(t("validPhoneNumber"));
      return;
    }

    const contactData = {
      ...newContact,
      phone: cleanedPhone,
    };

    if (editingId !== null) {
      setContacts((previous) =>
        previous.map((contact) =>
          contact.id === editingId
            ? { ...contact, ...contactData }
            : contact
        )
      );
    } else {
      setContacts((previous) => [
        ...previous,
        { ...contactData, id: Date.now() },
      ]);
    }

    closeContactForm();
  };

  const handleEditContact = (contact) => {
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship || "Other",
    });
    setEditingId(contact.id);
    setShowContactForm(true);
  };

  const removeContact = (id) => {
    if (window.confirm(t("deleteContactConfirm"))) {
      setContacts((previous) =>
        previous.filter((contact) => contact.id !== id)
      );
    }
  };

  const mapUrl = location
    ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    : "";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen lg:ml-72">
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950 px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              aria-label={t("openSidebar")}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold">{t("emergency")}</h1>
              <p className="text-xs text-slate-400">
                {t("emergencySubtitle")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs text-teal-400">
            <span className="h-2 w-2 rounded-full bg-teal-400"></span>
            {t("safetyCenter")}
          </div>
        </header>

        <div className="space-y-8 p-5 sm:p-8">
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-red-400">
              {t("emergencyAssistance").toUpperCase()}
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("yourSafetyFirst")}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {t("emergencyIntro")}
            </p>
          </section>

          <section className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/60 via-slate-900 to-slate-900 p-6 sm:p-10">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                <Siren size={34} />
              </div>

              <h3 className="text-2xl font-bold">
                {sosActive
                  ? t("demoSosActivated")
                  : t("needEmergencyHelp")}
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                {sosActive
                  ? t("demoSosActiveDescription")
                  : t("activateSosDescription")}
              </p>

              <button
                onClick={sosActive ? resetSOS : activateSOS}
                className={`mx-auto mt-8 flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 text-white shadow-2xl transition hover:scale-105 ${
                  sosActive
                    ? "border-teal-400/20 bg-teal-600 hover:bg-teal-500"
                    : "border-red-400/20 bg-red-600 hover:bg-red-500"
                }`}
              >
                {sosActive ? (
                  <CheckCircle2 size={38} />
                ) : (
                  <ShieldAlert size={42} />
                )}
                <span className="mt-2 text-2xl font-black">
                  {sosActive ? t("reset") : "SOS"}
                </span>
                <span className="mt-1 text-xs">
                  {sosActive ? t("demoActive") : t("activate")}
                </span>
              </button>

              <p className="mt-6 text-xs text-slate-500">
                {t("demoOnlyDisclaimer")}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-400/10 p-3 text-orange-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {t("currentGpsLocation")}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {t("detectGpsDescription")}
                  </p>
                </div>
              </div>

              <button
                onClick={getCurrentLocation}
                disabled={locationStatus === "loading"}
                className="flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {locationStatus === "loading" ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <LocateFixed size={18} />
                )}
                {locationStatus === "loading"
                  ? t("detecting")
                  : t("getCurrentLocation")}
              </button>
            </div>

            {locationStatus === "success" && location ? (
              <div className="rounded-xl border border-teal-400/20 bg-teal-400/5 p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-teal-400">
                  <CheckCircle2 size={19} />
                  {t("locationDetectedSuccessfully")}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("latitude")}
                    </p>
                    <p className="mt-1 break-all font-semibold">
                      {location.latitude.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("longitude")}
                    </p>
                    <p className="mt-1 break-all font-semibold">
                      {location.longitude.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("locationAccuracy")}
                    </p>
                    <p className="mt-1 font-semibold">
                      {t("approximately")}{" "}
                      {Math.round(location.accuracy)} {t("metres")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">
                      {t("lastUpdated")}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {location.timestamp}
                    </p>
                  </div>
                </div>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-600"
                >
                  <Navigation size={17} />
                  {t("viewLocationOnMaps")}
                </a>
              </div>
            ) : locationStatus === "error" ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-center gap-2 font-semibold text-red-400">
                  <AlertTriangle size={19} />
                  {t("locationDetectionFailedTitle")}
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {locationError}
                </p>
                <button
                  onClick={getCurrentLocation}
                  className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/20"
                >
                  {t("tryAgain")}
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
                <MapPin
                  className="mx-auto mb-3 text-slate-500"
                  size={34}
                />
                <p className="font-semibold">
                  {t("locationNotDetected")}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {t("allowLocationAccess")}
                </p>
              </div>
            )}

            <p className="mt-4 text-xs leading-5 text-slate-500">
              {t("locationPrivacyNote")}
            </p>
          </section>

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {t("sosStatus")}
                </p>
                <ShieldAlert
                  size={22}
                  className={sosActive ? "text-red-400" : "text-teal-400"}
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">
                {sosActive ? t("demoActive") : t("notActivated")}
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                {t("localDemoState")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {t("locationAccess")}
                </p>
                <MapPin size={22} className="text-orange-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold">
                {locationStatus === "success"
                  ? t("connected")
                  : locationStatus === "loading"
                  ? t("detecting")
                  : locationStatus === "error"
                  ? t("unavailable")
                  : t("notRequested")}
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                {t("browserGpsPermission")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {t("emergencyContacts")}
                </p>
                <Phone size={22} className="text-teal-400" />
              </div>
              <h3 className="mt-4 text-xl font-bold">
                {contacts.length}
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                {t("savedInBrowser")}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-bold">
                  {t("emergencyContacts")}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {t("manageTrustedContacts")}
                </p>
              </div>
              <button
                onClick={openAddForm}
                className="flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-teal-300"
              >
                <Plus size={18} />
                {t("addContact")}
              </button>
            </div>

            {showContactForm && (
              <form
                onSubmit={handleSaveContact}
                className="mb-6 rounded-xl border border-white/10 bg-slate-950 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="font-semibold">
                    {editingId !== null
                      ? t("editContact")
                      : t("addNewContact")}
                  </h4>
                  <button
                    type="button"
                    onClick={closeContactForm}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
                    aria-label={t("closeForm")}
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm">
                      {t("contactName")}
                    </label>
                    <input
                      type="text"
                      value={newContact.name}
                      onChange={(event) =>
                        setNewContact({
                          ...newContact,
                          name: event.target.value,
                        })
                      }
                      placeholder={t("enterName")}
                      maxLength={60}
                      required
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm">
                      {t("phoneNumber")}
                    </label>
                    <input
                      type="tel"
                      value={newContact.phone}
                      onChange={(event) =>
                        setNewContact({
                          ...newContact,
                          phone: event.target.value,
                        })
                      }
                      placeholder="+91 98765 43210"
                      pattern="[0-9+ -]{10,16}"
                      required
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm">
                      {t("relationship")}
                    </label>
                    <select
                      value={newContact.relationship}
                      onChange={(event) =>
                        setNewContact({
                          ...newContact,
                          relationship: event.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-teal-400"
                    >
                      <option value="Family">{t("family")}</option>
                      <option value="Parent">{t("parent")}</option>
                      <option value="Sibling">{t("sibling")}</option>
                      <option value="Friend">{t("friend")}</option>
                      <option value="Relative">{t("relative")}</option>
                      <option value="Partner">{t("partner")}</option>
                      <option value="Other">{t("other")}</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-teal-400 py-3 font-bold text-slate-950 hover:bg-teal-300"
                  >
                    {editingId !== null
                      ? t("updateContact")
                      : t("saveContact")}
                  </button>
                  <button
                    type="button"
                    onClick={closeContactForm}
                    className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {contacts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
                  <Users
                    className="mx-auto mb-3 text-slate-500"
                    size={35}
                  />
                  <p className="font-semibold">
                    {t("noEmergencyContacts")}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {t("addTrustedPerson")}
                  </p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-slate-950 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                        <User size={21} />
                      </div>
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {contact.phone}
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-xs text-teal-400">
                          {t(
                            `relationship_${(
                              contact.relationship || "Other"
                            ).toLowerCase()}`
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditContact(contact)}
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-teal-400 hover:bg-teal-400/10"
                      >
                        <Pencil size={16} />
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => removeContact(contact.id)}
                        className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-6">
            <div className="mb-5 flex items-center gap-3">
              <AlertTriangle size={23} className="text-orange-400" />
              <h3 className="font-bold">
                {t("emergencySafetyGuidelines")}
              </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-400">
              <p className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-teal-400"
                />
                {t("guidelineSafePlace")}
              </p>
              <p className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-teal-400"
                />
                {t("guidelineEmergencyServices")}
              </p>
              <p className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-teal-400"
                />
                {t("guidelineInformContacts")}
              </p>
            </div>
          </section>

          <footer className="border-t border-white/10 py-5 text-center text-xs leading-6 text-slate-500">
            {t("emergencyFooterDisclaimer")}
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Emergency;
