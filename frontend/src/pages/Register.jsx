import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError(t("passwordMinLength"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    if (!formData.agreeTerms) {
      setError(t("acceptTermsRequired"));
      return;
    }

    alert(t("registrationSubmittedDemo"));
    navigate("/login");
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 pl-12 text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10 placeholder:text-slate-500";

  const features = [
    "aiPoweredSafetyMonitoring",
    "realTimeLocationAssistance",
    "emergencySosSupport",
    "secureDigitalTouristIdentity",
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl">
        <div className="grid min-h-[760px] lg:grid-cols-2">
          {/* Left information panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 p-8 sm:p-12">
            <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl"></div>

            <Link
              to="/"
              className="relative z-10 flex items-center gap-3 text-xl font-bold"
            >
              <ShieldCheck size={34} className="text-teal-400" />
              <span>
                {t("smartTourist")}{" "}
                <span className="text-teal-400">{t("safety")}</span>
              </span>
            </Link>

            <div className="relative z-10 my-10">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-400/10">
                <ShieldCheck size={34} className="text-teal-400" />
              </div>

              <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">
                {t("travelFreely")}
                <br />
                <span className="text-teal-400">{t("staySecure")}</span>
              </h1>

              <p className="max-w-md text-base leading-8 text-slate-300">
                {t("registerPanelDescription")}
              </p>

              <div className="mt-10 space-y-6">
                {features.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-teal-400"
                    />
                    <span className="text-sm text-slate-300">{t(item)}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative z-10 text-xs text-slate-500">
              {t("registrationSystemFooter")}
            </p>
          </div>

          {/* Right registration form */}
          <div className="flex items-center justify-center bg-slate-900 px-6 py-10 sm:px-12">
            <div className="w-full max-w-md">
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-teal-400"
              >
                <ArrowLeft size={17} />
                {t("backToHome")}
              </Link>

              <p className="mb-2 text-sm font-bold tracking-widest text-teal-400">
                {t("getStartedLabel")}
              </p>

              <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
                {t("createAccount")}
              </h2>

              <p className="mb-7 text-sm leading-6 text-slate-400">
                {t("registerDescription")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("fullName")}
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      size={19}
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t("enterFullName")}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("emailAddress")}
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      size={19}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("enterEmail")}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Phone number field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("phoneNumber")}
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      size={19}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("enterPhoneNumber")}
                      pattern="[0-9]{10}"
                      title={t("validPhoneNumber")}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("password")}
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      size={19}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t("createPassword")}
                      className={`${inputClass} pr-12`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t("confirmPassword")}
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      size={19}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder={t("confirmYourPassword")}
                      className={`${inputClass} pr-12`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? t("hidePassword")
                          : t("showPassword")
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms and conditions */}
                <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 accent-teal-400"
                  />
                  <span>
                    {t("agreeTermsPrefix")}{" "}
                    <span className="text-teal-400">
                      {t("termsAndConditions")}
                    </span>{" "}
                    {t("and")}{" "}
                    <span className="text-teal-400">{t("privacyPolicy")}</span>.
                  </span>
                </label>

                {error && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-teal-400 py-4 font-bold text-slate-950 transition hover:bg-teal-300"
                >
                  {t("createAccount")}
                  <ArrowRight size={19} />
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-700"></div>
                <span className="text-xs text-slate-500">
                  {t("alreadyRegisteredLabel")}
                </span>
                <div className="h-px flex-1 bg-slate-700"></div>
              </div>

              <p className="text-center text-sm text-slate-400">
                {t("alreadyHaveAccount")}{" "}
                <Link
                  to="/login"
                  className="font-bold text-teal-400 hover:text-teal-300"
                >
                  {t("login")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;