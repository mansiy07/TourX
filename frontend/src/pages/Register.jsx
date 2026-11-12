
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  // Update the form whenever an input changes.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate the form before submitting.
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }

    alert("Registration form submitted successfully! Backend integration will be added later.");
    navigate("/login");
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 pl-12 text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10 placeholder:text-slate-500";

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl">
        <div className="grid min-h-[760px] lg:grid-cols-2">
          {/* Left information panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 p-8 sm:p-12">
            <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl"></div>

            <Link to="/" className="relative z-10 flex items-center gap-3 text-xl font-bold">
              <ShieldCheck size={34} className="text-teal-400" />
              <span>Smart Tourist <span className="text-teal-400">Safety</span></span>
            </Link>

            <div className="relative z-10 my-10">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/30 bg-teal-400/10">
                <ShieldCheck size={34} className="text-teal-400" />
              </div>

              <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">
                Travel Freely.
                <br />
                <span className="text-teal-400">Stay Secure.</span>
              </h1>

              <p className="max-w-md text-base leading-8 text-slate-300">
                Create your account and experience smarter, safer and more
                secure journeys with intelligent tourist safety assistance.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  "AI-powered safety monitoring",
                  "Real-time location assistance",
                  "Emergency SOS support",
                  "Secure digital tourist identity",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="shrink-0 text-teal-400" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative z-10 text-xs text-slate-500">
              AI-Powered Smart Tourist Safety & Incident Response System
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
                Back to Home
              </Link>

              <p className="mb-2 text-sm font-bold tracking-widest text-teal-400">
                GET STARTED
              </p>

              <h2 className="mb-2 text-3xl font-bold sm:text-4xl">
                Create Account
              </h2>

              <p className="mb-7 text-sm leading-6 text-slate-400">
                Join Smart Tourist Safety and make every journey safer.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Phone number field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      pattern="[0-9]{10}"
                      title="Enter a valid 10-digit phone number"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className={`${inputClass} pr-12`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password field */}
                <div>
                  <label className="mb-2 block text-sm font-medium">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`${inputClass} pr-12`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400"
                    >
                      {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
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
                    I agree to the <span className="text-teal-400">Terms and Conditions</span> and Privacy Policy.
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
                  Create Account
                  <ArrowRight size={19} />
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-700"></div>
                <span className="text-xs text-slate-500">ALREADY REGISTERED?</span>
                <div className="h-px flex-1 bg-slate-700"></div>
              </div>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-teal-400 hover:text-teal-300">
                  Login
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
