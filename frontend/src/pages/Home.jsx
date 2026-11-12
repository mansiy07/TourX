
import {
  ShieldCheck,
  MapPin,
  Siren,
  BrainCircuit,
  Route,
  Fingerprint,
  ArrowRight,
  Radio,
  Activity,
  LockKeyhole,
  Globe2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: Siren,
    title: "Instant SOS Alerts",
    description:
      "Send emergency alerts with your live location to registered contacts and response teams.",
  },
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description:
      "Monitor tourist locations and provide location-based safety assistance.",
  },
  {
    icon: BrainCircuit,
    title: "AI Risk Prediction",
    description:
      "Analyse location patterns and surrounding risk factors to identify potential safety threats.",
  },
  {
    icon: Route,
    title: "Smart Safe Routes",
    description:
      "Identify potentially risky routes and recommend safer travel alternatives.",
  },
  {
    icon: Activity,
    title: "Anomaly Detection",
    description:
      "Detect unusual movement patterns and unexpected deviations during a trip.",
  },
  {
    icon: Fingerprint,
    title: "Blockchain Security",
    description:
      "Use verifiable digital identity and tamper-evident incident records.",
  },
];

function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative flex min-h-screen w-full items-center overflow-hidden pt-24"
        >
          {/* Decorative background elements */}
          <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-teal-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
            {/* Hero Content */}
            <div className="w-full">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm text-teal-300">
                <Radio size={16} />
                Intelligent Tourist Safety System
              </div>

              <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl xl:text-7xl">
                Explore Freely.
                <span className="mt-2 block text-teal-400">
                  Travel Safely.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                An AI-powered smart tourist safety platform designed to
                monitor travel risks, detect unusual activities and provide
                faster emergency assistance.
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-teal-300 sm:px-7"
                >
                  Start Your Journey
                  <ArrowRight size={19} />
                </a>

                <a
                  href="#features"
                  className="inline-flex items-center rounded-xl border border-white/15 px-6 py-3.5 text-white transition hover:border-teal-400 hover:text-teal-400 sm:px-7"
                >
                  Explore Features
                </a>
              </div>

              {/* Platform Highlights */}
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-7 sm:mt-14 sm:gap-6 sm:pt-8">
                <div>
                  <h3 className="text-2xl font-bold text-teal-400">AI</h3>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Risk Intelligence
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-teal-400">GPS</h3>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Live Monitoring
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-teal-400">Web3</h3>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    Data Integrity
                  </p>
                </div>
              </div>
            </div>

            {/* Tourist Monitoring Preview */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-0 rounded-full bg-teal-400/10 blur-3xl" />

              <div className="relative rounded-3xl border border-white/10 bg-slate-900 p-4 shadow-2xl sm:p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">
                      Safety Overview
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">
                      Tourist Monitoring
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-2 text-xs text-teal-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                    Demo Preview
                  </span>
                </div>

                {/* Illustrative Location Grid */}
                <div className="relative h-56 overflow-hidden rounded-2xl bg-slate-800 sm:h-64">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(45,212,191,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,.15) 1px, transparent 1px)",
                      backgroundSize: "35px 35px",
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-teal-400/30 sm:h-44 sm:w-44">
                      <div className="flex h-28 w-28 items-center justify-center rounded-full border border-teal-400/40">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-400/20">
                          <MapPin size={32} className="text-teal-300" />
                        </div>
                      </div>

                      <span className="absolute right-2 top-5 h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_15px_#2dd4bf]" />
                      <span className="absolute bottom-8 left-0 h-2 w-2 rounded-full bg-cyan-400" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
                    <MapPin size={13} className="mr-1 inline text-teal-400" />
                    Location preview
                  </div>
                </div>

                {/* Safety and Security Status */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl bg-slate-800/80 p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck size={16} className="text-teal-400" />
                      Safety System
                    </div>
                    <p className="mt-2 text-base font-semibold sm:text-lg">
                      AI Enabled
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-800/80 p-3 sm:p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <LockKeyhole size={16} className="text-teal-400" />
                      Data Security
                    </div>
                    <p className="mt-2 text-base font-semibold sm:text-lg">
                      Protected
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Illustrative interface preview — not live tracking data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full bg-slate-900/60 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
                Our Capabilities
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                Safety Features Built for{" "}
                <span className="text-teal-400">Every Journey</span>
              </h2>

              <p className="mt-5 leading-7 text-slate-400">
                A connected safety ecosystem combining intelligent monitoring,
                emergency response and secure digital records.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-400/50 sm:p-7"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400 transition group-hover:bg-teal-400 group-hover:text-slate-950">
                      <Icon size={27} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-20 sm:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
                Simple Process
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                How It <span className="text-teal-400">Works</span>
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {[
                [
                  "01",
                  "Register & Plan",
                  "Create your tourist profile, add emergency contacts and plan your trip.",
                ],
                [
                  "02",
                  "Monitor & Analyse",
                  "Location and travel signals are analysed for potential safety risks.",
                ],
                [
                  "03",
                  "Alert & Respond",
                  "Receive safety alerts and get connected to emergency response support.",
                ],
              ].map((step) => (
                <div
                  key={step[0]}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-7 sm:p-8"
                >
                  <span className="text-4xl font-bold text-teal-400/50">
                    {step[0]}
                  </span>

                  <h3 className="mt-5 text-2xl font-semibold">{step[1]}</h3>

                  <p className="mt-3 leading-7 text-slate-400">{step[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="w-full border-y border-white/10 bg-gradient-to-r from-teal-500/10 via-slate-900 to-cyan-500/10 py-20"
        >
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <Globe2 size={42} className="mx-auto text-teal-400" />

            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Travel With Confidence
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              Bringing together AI-powered safety intelligence, real-time
              location monitoring and blockchain-backed data integrity to
              support safer tourism.
            </p>

            <a
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Get Started
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
