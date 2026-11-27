
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Bell,
  Shield,
  Lock,
  MapPin,
  Mail,
  Smartphone,
  Save,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    emergencyAlerts: true,
    locationSharing: false,
    tripUpdates: true,
    profileVisibility: false,
  });

  const [saved, setSaved] = useState(false);

  // Update a selected preference.
  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  // Save the current preferences in local storage.
  const handleSave = () => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    setSaved(true);
  };

  // Render a reusable preference toggle.
  const PreferenceToggle = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-5 last:border-0">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        aria-label={title}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-teal-400" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
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
              aria-label={t("openSidebar")}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold">{t("settings")}</h1>
              <p className="text-xs text-slate-400">
                {t("manageApplicationPreferences")}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-teal-400/10 p-3 text-teal-400">
            <SettingsIcon size={22} />
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-7 p-5 sm:p-8">
          {/* Introduction */}
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-teal-400">
              {t("preferences").toUpperCase()}
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("applicationSettings")}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {t("customizeExperience")}
            </p>
          </section>

          {/* Appearance settings */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-5 flex items-center gap-3">
              <Sun size={22} className="text-teal-400" />
              <div>
                <h3 className="font-bold">{t("appearance")}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  {t("chooseTheme")}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => {
                  if (theme !== "light") toggleTheme();
                }}
                aria-pressed={theme === "light"}
                className={`flex items-center gap-4 rounded-xl border p-5 text-left transition ${
                  theme === "light"
                    ? "border-teal-400 bg-teal-400/10"
                    : "border-white/10 bg-slate-950 hover:border-white/30"
                }`}
              >
                <Sun size={25} className="text-orange-400" />
                <div>
                  <p className="font-semibold">{t("lightMode")}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {t("lightModeDescription")}
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  if (theme !== "dark") toggleTheme();
                }}
                aria-pressed={theme === "dark"}
                className={`flex items-center gap-4 rounded-xl border p-5 text-left transition ${
                  theme === "dark"
                    ? "border-teal-400 bg-teal-400/10"
                    : "border-white/10 bg-slate-950 hover:border-white/30"
                }`}
              >
                <Moon size={25} className="text-teal-400" />
                <div>
                  <p className="font-semibold">{t("darkMode")}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {t("darkModeDescription")}
                  </p>
                </div>
              </button>
            </div>
          </section>

          {/* Notification settings */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Bell size={22} className="text-teal-400" />
              <div>
                <h3 className="font-bold">{t("notifications")}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  {t("notificationPreferencesDescription")}
                </p>
              </div>
            </div>

            <PreferenceToggle
              title={t("emailNotifications")}
              description={t("emailNotificationsDescription")}
              checked={preferences.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />

            <PreferenceToggle
              title={t("pushNotifications")}
              description={t("pushNotificationsDescription")}
              checked={preferences.pushNotifications}
              onChange={() => handleToggle("pushNotifications")}
            />

            <PreferenceToggle
              title={t("emergencyAlerts")}
              description={t("emergencyAlertsDescription")}
              checked={preferences.emergencyAlerts}
              onChange={() => handleToggle("emergencyAlerts")}
            />

            <PreferenceToggle
              title={t("tripUpdates")}
              description={t("tripUpdatesDescription")}
              checked={preferences.tripUpdates}
              onChange={() => handleToggle("tripUpdates")}
            />
          </section>

          {/* Privacy settings */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-2 flex items-center gap-3">
              <Shield size={22} className="text-teal-400" />
              <div>
                <h3 className="font-bold">{t("privacyLocation")}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  {t("privacyPreferencesDescription")}
                </p>
              </div>
            </div>

            <PreferenceToggle
              title={t("locationSharing")}
              description={t("locationSharingDescription")}
              checked={preferences.locationSharing}
              onChange={() => handleToggle("locationSharing")}
            />

            <PreferenceToggle
              title={t("profileVisibility")}
              description={t("profileVisibilityDescription")}
              checked={preferences.profileVisibility}
              onChange={() => handleToggle("profileVisibility")}
            />
          </section>

          {/* Security information */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-5 flex items-center gap-3">
              <Lock size={22} className="text-teal-400" />
              <div>
                <h3 className="font-bold">{t("security")}</h3>
                <p className="mt-1 text-xs text-slate-400">
                  {t("accountSecurityFeatures")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-950 p-4">
                <Mail size={20} className="text-teal-400" />
                <div>
                  <p className="text-sm font-semibold">
                    {t("emailVerification")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t("availableAfterBackendIntegration")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-950 p-4">
                <Smartphone size={20} className="text-teal-400" />
                <div>
                  <p className="text-sm font-semibold">
                    {t("twoFactorAuthentication")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t("securityIntegrationPending")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-950 p-4">
                <MapPin size={20} className="text-teal-400" />
                <div>
                  <p className="text-sm font-semibold">
                    {t("locationPermissions")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t("gpsPermissionManagementPending")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Save preferences */}
          <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold">{t("saveYourPreferences")}</h3>
              <p className="mt-1 text-xs text-slate-400">
                {t("savePreferencesDescription")}
              </p>
              {saved && (
                <p className="mt-2 text-sm text-teal-400">
                  {t("preferencesSaved")}
                </p>
              )}
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
            >
              <Save size={17} />
              {t("saveSettings")}
            </button>
          </section>

          <p className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
            {t("settingsFooterDisclaimer")}
          </p>
        </div>
      </main>
    </div>
  );
}

export default Settings;
