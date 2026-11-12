
import { useState } from "react";
import {
  Menu,
  Bell,
  ShieldAlert,
  MapPin,
  Route,
  CheckCheck,
  Trash2,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const initialNotifications = [
  {
    id: 1,
    title: "Emergency Alert",
    message: "This is a sample emergency notification for the demo interface.",
    time: "10 minutes ago",
    type: "emergency",
    read: false,
  },
  {
    id: 2,
    title: "Route Safety Update",
    message: "A sample route safety update is available for your planned trip.",
    time: "30 minutes ago",
    type: "route",
    read: false,
  },
  {
    id: 3,
    title: "Moderate Risk Indicator",
    message: "A demo location has been assigned a moderate risk level.",
    time: "1 hour ago",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "Trip Reminder",
    message: "Remember to review your travel plan before starting your trip.",
    time: "Yesterday",
    type: "info",
    read: true,
  },
  {
    id: 5,
    title: "Profile Updated",
    message: "Your profile was updated in the demo session.",
    time: "Yesterday",
    type: "success",
    read: true,
  },
];

function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");

  // Mark one notification as read.
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  // Mark all notifications as read.
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  // Remove one notification from the list.
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // Remove all notifications from the list.
  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "Unread") return !item.read;
    if (filter === "Read") return item.read;
    return true;
  });

  // Select an icon and color based on notification type.
  const getNotificationStyle = (type) => {
    const styles = {
      emergency: {
        icon: ShieldAlert,
        color: "text-red-400",
        background: "bg-red-400/10",
      },
      route: {
        icon: Route,
        color: "text-blue-400",
        background: "bg-blue-400/10",
      },
      warning: {
        icon: AlertTriangle,
        color: "text-orange-400",
        background: "bg-orange-400/10",
      },
      info: {
        icon: Info,
        color: "text-purple-400",
        background: "bg-purple-400/10",
      },
      success: {
        icon: CheckCircle2,
        color: "text-teal-400",
        background: "bg-teal-400/10",
      },
    };

    return styles[type] || styles.info;
  };

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
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-xs text-slate-400">
                Stay informed about your travel safety
              </p>
            </div>
          </div>

          <div className="relative rounded-xl bg-teal-400/10 p-3 text-teal-400">
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-7 p-5 sm:p-8">
          {/* Introduction */}
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-teal-400">
              NOTIFICATION CENTER
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Your Updates
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Review safety alerts, travel updates and account notifications.
            </p>
          </section>

          {/* Notification summary */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Total Notifications</p>
              <h3 className="mt-3 text-3xl font-bold">
                {notifications.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Unread</p>
              <h3 className="mt-3 text-3xl font-bold text-teal-400">
                {unreadCount}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Read</p>
              <h3 className="mt-3 text-3xl font-bold">
                {notifications.length - unreadCount}
              </h3>
            </div>
          </section>

          {/* Notification controls */}
          <section className="rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-bold">All Notifications</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Manage your notification history.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-teal-400/40 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <CheckCheck size={15} />
                  Mark All Read
                </button>

                <button
                  onClick={clearAll}
                  disabled={notifications.length === 0}
                  className="flex items-center gap-2 rounded-xl border border-red-400/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={15} />
                  Clear All
                </button>
              </div>
            </div>

            {/* Notification filters */}
            <div className="mt-6 flex gap-2 border-b border-white/10 pb-4">
              {["All", "Unread", "Read"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm transition ${
                    filter === item
                      ? "bg-teal-400 text-slate-950"
                      : "bg-slate-950 text-slate-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Notification list */}
            <div className="mt-5 space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 text-center">
                  <Bell size={35} className="mx-auto text-slate-600" />
                  <p className="mt-4 font-semibold">No notifications found</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Your selected notification list is empty.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const style = getNotificationStyle(notification.type);
                  const Icon = style.icon;

                  return (
                    <div
                      key={notification.id}
                      className={`flex flex-col gap-4 rounded-xl border p-4 transition sm:flex-row sm:items-start ${
                        notification.read
                          ? "border-white/10 bg-slate-950"
                          : "border-teal-400/20 bg-teal-400/5"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.background} ${style.color}`}
                      >
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-teal-400" />
                          )}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {notification.message}
                        </p>

                        <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={13} />
                          {notification.time}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:justify-end">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="rounded-lg px-3 py-2 text-xs text-teal-400 hover:bg-teal-400/10"
                          >
                            Mark Read
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          aria-label="Delete notification"
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-400"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <div className="flex items-start gap-3 rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5">
            <MapPin size={21} className="mt-0.5 shrink-0 text-orange-400" />
            <p className="text-xs leading-6 text-slate-400">
              These are sample notifications. Real-time push notifications,
              emergency alerts and server synchronization will be integrated
              with the backend later.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notifications;
