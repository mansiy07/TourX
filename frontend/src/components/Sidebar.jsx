
import { NavLink } from "react-router-dom";
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
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Trips", path: "/trips", icon: Map },
  { name: "Safe Routes", path: "/safe-routes", icon: Route },
  { name: "Emergency SOS", path: "/emergency", icon: ShieldAlert },
  { name: "AI Risk Dashboard", path: "/ai-risk-dashboard", icon: BrainCircuit },
  { name: "AI Safety Assistant", path: "/safety-assistant", icon: Bot },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Digital Tourist ID", path: "/digital-id", icon: Fingerprint },
  { name: "My Documents", path: "/documents", icon: FileText },
  { name: "My Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar({ isOpen = true, onClose }) {
  return (
    <>
      {/* Mobile sidebar backdrop */}
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
              Smart Tourist <span className="text-teal-400">Safety</span>
            </span>
          </NavLink>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
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
                {item.name}
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
              <p className="text-sm font-semibold">Tourist User</p>
              <p className="text-xs text-slate-500">Traveler Account</p>
            </div>
          </div>

          <NavLink
            to="/login"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
