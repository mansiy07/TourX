
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Update form fields when the user enters information.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle the login form submission.
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Login UI is ready. Backend authentication will be connected later.");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-5 py-12 text-white">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-2">

        {/* Login Information Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-500/20 via-slate-900 to-slate-950 p-12 lg:flex">
          <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

          <Link to="/" className="relative flex items-center gap-3">
            <ShieldCheck size={34} className="text-teal-400" />
            <span className="text-xl font-bold">
              Smart Tourist <span className="text-teal-400">Safety</span>
            </span>
          </Link>

          <div className="relative">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-400/10">
              <ShieldCheck size={34} className="text-teal-400" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Your Journey.
              <span className="block text-teal-400">Your Safety.</span>
            </h1>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Access your personal safety dashboard, monitor your journeys
              and stay connected with emergency assistance.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Smart AI-powered safety monitoring",
                "Real-time location assistance",
                "Secure digital tourist identity",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ShieldCheck size={19} className="text-teal-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-slate-500">
            AI-Powered Smart Tourist Safety & Incident Response System
          </p>
        </div>

        {/* Login Form Panel */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">

            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-teal-400"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>

            <div className="mb-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 lg:hidden">
                <ShieldCheck size={30} className="text-teal-400" />
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
                Welcome Back
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Login to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your credentials to access your safety dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 px-4 transition focus-within:border-teal-400">
                  <Mail size={19} className="shrink-0 text-slate-500" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-teal-400 transition hover:text-teal-300"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 px-4 transition focus-within:border-teal-400">
                  <LockKeyhole size={19} className="shrink-0 text-slate-500" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-500 transition hover:text-teal-400"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 accent-teal-400"
                />
                Remember me
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 py-4 font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                Login to Account
                <ArrowRight size={19} />
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500">NEW TO SMART TOURIST SAFETY?</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-teal-400 transition hover:text-teal-300"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
