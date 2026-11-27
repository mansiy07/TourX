
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Map,
  Route,
  ShieldAlert,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  X,
  BrainCircuit,
  Bell,
  Bot,
  Fingerprint,
  FileText,
} from "lucide-react";

const menuItems = [
  { key: "dashboard", path: "/dashboard", icon: LayoutDashboard },
  { key: "myTrips", path: "/trips", icon: Map },
  { key: "safeRoutes", path: "/safe-routes", icon: Route },
  { key: "emergency", path: "/emergency", icon: ShieldAlert },
  { key: "aiRiskDashboard", path: "/ai-risk-dashboard", icon: BrainCircuit },
  { key: "safetyAssistant", path: "/safety-assistant", icon: Bot },
  { key: "notifications", path: "/notifications", icon: Bell },
  { key: "digitalId", path: "/digital-id", icon: Fingerprint },
  { key: "documents", path: "/documents", icon: FileText },
  { key: "profile", path: "/profile", icon: User },
  { key: "settings", path: "/settings", icon: Settings },
];

function Sidebar({ isOpen = true, onClose }) {
  const { t } = useTranslation();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand section */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <ShieldCheck size={32} className="text-teal-400" />
            <span className="text-lg font-bold">
              {t("appName")}
            </span>
          </NavLink>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white lg:hidden"
            aria-label={t("closeMenu")}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            {t("mainMenu")}
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-400/10 text-teal-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {t(item.key)}
              </NavLink>
            );
          })}
        </nav>

        {/* User information */}
        <div className="border-t border-white/10 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
              <User size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold">{t("touristUser")}</p>
              <p className="text-xs text-slate-500">{t("travelerAccount")}</p>
            </div>
          </div>

          <NavLink
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            {t("logout")}
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
