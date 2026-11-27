import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Menu, Sun, Moon, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LanguageSelector from "./LanguageSelector";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDark = theme === "dark";

  const navClass = isDark
    ? "bg-slate-950/90 border-white/10"
    : "bg-white/90 border-slate-200";

  const textClass = isDark
    ? "text-slate-200"
    : "text-slate-700";

  const mobileMenuClass = isDark
    ? "bg-slate-950 border-white/10"
    : "bg-white border-slate-200";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-3">

        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 shrink-0">
          <ShieldCheck size={32} className="text-teal-500" />
          <span className={`text-lg sm:text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            {t("appName")}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className={`hidden lg:flex items-center gap-6 text-sm ${textClass}`}>
          <Link to="/#home" className="hover:text-teal-500 transition">
            {t("home")}
          </Link>
          <Link to="/#features" className="hover:text-teal-500 transition">
            {t("features")}
          </Link>
          <Link to="/#how-it-works" className="hover:text-teal-500 transition">
            {t("howItWorks")}
          </Link>
          <Link to="/#about" className="hover:text-teal-500 transition">
            {t("about")}
          </Link>
        </div>

        {/* Language, Theme and Authentication */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>

          <button
            onClick={toggleTheme}
            aria-label={t("toggleTheme")}
            title={t(isDark ? "switchToLightMode" : "switchToDarkMode")}
            className="p-2.5 rounded-xl border border-teal-500/30 text-teal-500 hover:bg-teal-500/10 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className={`px-3 py-2 hover:text-teal-500 transition ${textClass}`}
            >
              {t("login")}
            </Link>

            <Link
              to="/register"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-4 py-2.5 rounded-lg transition"
            >
              {t("getStarted")}
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t(isMenuOpen ? "closeMenu" : "openMenu")}
            aria-expanded={isMenuOpen}
            className={`lg:hidden p-2 rounded-lg ${textClass}`}
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={`lg:hidden border-t px-6 py-5 ${mobileMenuClass}`}>
          <div className="flex flex-col gap-5">

            <div className="sm:hidden">
              <LanguageSelector />
            </div>

            <Link to="/#home" onClick={closeMenu} className={textClass}>
              {t("home")}
            </Link>

            <Link to="/#features" onClick={closeMenu} className={textClass}>
              {t("features")}
            </Link>

            <Link to="/#how-it-works" onClick={closeMenu} className={textClass}>
              {t("howItWorks")}
            </Link>

            <Link to="/#about" onClick={closeMenu} className={textClass}>
              {t("about")}
            </Link>

            <div className="border-t border-slate-500/20 pt-4 flex flex-col gap-4">
              <Link to="/login" onClick={closeMenu} className={textClass}>
                {t("login")}
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-teal-500 text-slate-950 font-semibold text-center px-5 py-3 rounded-lg"
              >
                {t("getStarted")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;