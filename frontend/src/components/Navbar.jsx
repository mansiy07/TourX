
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Menu, Sun, Moon, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define theme-based styles for the navigation bar.
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

  // Close the mobile menu after selecting a navigation link.
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b ${navClass}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <ShieldCheck size={32} className="text-teal-500" />
          <span className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            Smart Tourist <span className="text-teal-500">Safety</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className={`hidden md:flex items-center gap-8 text-sm ${textClass}`}>
          <Link to="/#home" className="hover:text-teal-500 transition">Home</Link>
          <Link to="/#features" className="hover:text-teal-500 transition">Features</Link>
          <Link to="/#how-it-works" className="hover:text-teal-500 transition">How It Works</Link>
          <Link to="/#about" className="hover:text-teal-500 transition">About</Link>
        </div>

        {/* Theme and Authentication Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="p-2.5 rounded-xl border border-teal-500/30 text-teal-500 hover:bg-teal-500/10 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Desktop Authentication Links */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className={`px-4 py-2 hover:text-teal-500 transition ${textClass}`}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-5 py-2.5 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className={`md:hidden p-2 rounded-lg ${textClass}`}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t px-6 py-5 ${mobileMenuClass}`}>
          <div className="flex flex-col gap-5">

            <Link to="/#home" onClick={closeMenu} className={textClass}>
              Home
            </Link>

            <Link to="/#features" onClick={closeMenu} className={textClass}>
              Features
            </Link>

            <Link to="/#how-it-works" onClick={closeMenu} className={textClass}>
              How It Works
            </Link>

            <Link to="/#about" onClick={closeMenu} className={textClass}>
              About
            </Link>

            <div className="border-t border-slate-500/20 pt-4 flex flex-col gap-4">
              <Link to="/login" onClick={closeMenu} className={textClass}>
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-teal-500 text-slate-950 font-semibold text-center px-5 py-3 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
