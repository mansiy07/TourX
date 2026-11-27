import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(t("resetLinkSentMessage"));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl sm:p-10">
        <Link to="/" className="mb-10 flex items-center gap-3 text-xl font-bold">
          <ShieldCheck size={32} className="text-teal-400" />
          <span>
            {t("smartTourist")}{" "}
            <span className="text-teal-400">{t("safety")}</span>
          </span>
        </Link>

        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-400/10">
          <Mail size={30} className="text-teal-400" />
        </div>

        <p className="mb-2 text-sm font-bold tracking-widest text-teal-400">
          {t("passwordRecovery")}
        </p>

        <h1 className="mb-3 text-3xl font-bold">
          {t("forgotPasswordTitle")}
        </h1>

        <p className="mb-8 text-sm leading-6 text-slate-400">
          {t("forgotPasswordDescription")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("emailAddress")}
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("registeredEmailPlaceholder")}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-teal-400 py-4 font-bold text-slate-950 transition hover:bg-teal-300"
          >
            {t("sendResetLink")}
            <ArrowRight size={19} />
          </button>
        </form>

        {message && (
          <div className="mt-5 flex gap-3 rounded-xl border border-teal-400/30 bg-teal-400/10 p-4 text-sm text-teal-300">
            <CheckCircle2 size={20} className="shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <div className="mt-8 border-t border-slate-700 pt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 transition hover:text-teal-300"
          >
            <ArrowLeft size={17} />
            {t("backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;