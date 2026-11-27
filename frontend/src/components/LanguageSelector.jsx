
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
    { code: "zh", name: "中文" },
    { code: "ja", name: "日本語" },
  ];

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem("appLanguage", language);
  };

  useEffect(() => {
    const language = i18n.resolvedLanguage || "en";

    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [i18n.resolvedLanguage]);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-3 py-2">
      <Languages size={18} className="text-teal-400" />

      <select
        value={i18n.language?.split("-")[0] || "en"}
        onChange={handleLanguageChange}
        aria-label={t("language")}
        className="max-w-32 cursor-pointer bg-transparent text-sm text-white outline-none"
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
            className="bg-slate-900 text-white"
          >
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
