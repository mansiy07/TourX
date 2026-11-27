import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-teal-400" size={24} />
          <span className="font-semibold text-white">{t("appName")}</span>
        </div>

        <p className="text-sm text-slate-500 text-center">
          {t("footerTagline")}
        </p>

        <p className="text-sm text-slate-500">
          {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;