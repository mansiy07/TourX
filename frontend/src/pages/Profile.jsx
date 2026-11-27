
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Camera,
  Save,
  Pencil,
  Globe,
  BriefcaseBusiness,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function Profile() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // Store profile information in local component state.
  const [profile, setProfile] = useState({
    fullName: "Tourist User",
    email: "tourist@example.com",
    phone: "",
    location: "",
    nationality: "",
    occupation: "",
    bio: "",
  });

  // Update profile fields when the user edits them.
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  // Save profile changes in the current frontend session.
  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
  };

  const handleEditToggle = () => {
    setIsEditing((current) => !current);
    setSaved(false);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400 disabled:cursor-not-allowed disabled:opacity-70";

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
              <h1 className="text-xl font-bold">{t("profile")}</h1>
              <p className="text-xs text-slate-400">
                {t("managePersonalInformation")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs text-teal-400">
            <ShieldCheck size={15} />
            {t("touristAccount")}
          </div>
        </header>

        <div className="space-y-7 p-5 sm:p-8">
          {/* Page introduction */}
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-teal-400">
              {t("accountSettings").toUpperCase()}
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("personalProfile")}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {t("profileIntroduction")}
            </p>
          </section>

          {/* Profile overview */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-teal-400/20 bg-teal-400/10 text-teal-400">
                <User size={42} />
                <button
                  type="button"
                  disabled
                  title={t("photoUploadPending")}
                  aria-label={t("photoUploadPending")}
                  className="absolute bottom-0 right-0 rounded-full border-2 border-slate-900 bg-teal-400 p-2 text-slate-950"
                >
                  <Camera size={14} />
                </button>
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold">
                  {profile.fullName || t("yourName")}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {profile.email || t("addEmailAddress")}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1.5 text-xs text-teal-400">
                  <ShieldCheck size={14} />
                  {t("touristProfile")}
                </div>
              </div>

              <div className="sm:ml-auto">
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold transition hover:border-teal-400/40"
                >
                  <Pencil size={16} />
                  {isEditing ? t("cancelEditing") : t("editProfile")}
                </button>
              </div>
            </div>
          </section>

          {/* Profile form */}
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8"
          >
            <div className="mb-7 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold">
                  {t("personalInformation")}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {t("basicAccountDetails")}
                </p>
              </div>
              <User size={22} className="text-teal-400" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  {t("fullName")}
                </label>
                <div className="relative">
                  <User
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className={`${inputClass} pl-11`}
                    placeholder={t("enterFullName")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  {t("emailAddress")}
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className={`${inputClass} pl-11`}
                    placeholder={t("enterEmail")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  {t("phoneNumber")}
                </label>
                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`${inputClass} pl-11`}
                    placeholder={t("enterPhoneNumber")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  {t("location")}
                </label>
                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`${inputClass} pl-11`}
                    placeholder={t("enterCity")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  {t("nationality")}
                </label>
                <div className="relative">
                  <Globe
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="nationality"
                    value={profile.nationality}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`${inputClass} pl-11`}
                    placeholder={t("enterNationality")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  {t("occupation")}
                </label>
                <div className="relative">
                  <BriefcaseBusiness
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="occupation"
                    value={profile.occupation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`${inputClass} pl-11`}
                    placeholder={t("enterOccupation")}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-slate-300">
                  {t("aboutMe")}
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className={inputClass}
                  placeholder={t("writeAboutYourself")}
                />
              </div>
            </div>

            {saved && (
              <p className="mt-5 text-sm font-medium text-teal-400">
                {t("profileUpdatedDemo")}
              </p>
            )}

            {isEditing && (
              <div className="mt-7 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-teal-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
                >
                  <Save size={17} />
                  {t("saveChanges")}
                </button>
              </div>
            )}
          </form>

          {/* Account information */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
            <h3 className="text-lg font-bold">
              {t("accountInformation")}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {t("additionalAccountDetails")}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950 p-4">
                <div className="rounded-xl bg-teal-400/10 p-3 text-teal-400">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {t("accountSecurity")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t("authenticationPending")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950 p-4">
                <div className="rounded-xl bg-teal-400/10 p-3 text-teal-400">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {t("memberSince")}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t("registrationIntegrationPending")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <p className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
            {t("profileStorageDisclaimer")}
          </p>
        </div>
      </main>
    </div>
  );
}

export default Profile;
