
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  ShieldCheck,
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Download,
  QrCode,
  CheckCircle2,
  Fingerprint,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Sidebar from "../components/Sidebar";

function DigitalID() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  // Sample tourist information for the frontend demonstration.
  const tourist = {
    name: "Tourist User",
    id: "STS-2026-00125",
    nationality: "Indian",
    email: "tourist@example.com",
    phone: "+91 98765 43210",
    location: "Prayagraj, Uttar Pradesh",
    issuedOn: "11 November 2026",
    validUntil: "11 November 2027",
  };

  // Generate a verification URL using the sample tourist ID.
  const verificationUrl = `https://smart-tourist-safety.example/verify/${tourist.id}`;

  // Open the browser print dialog for saving the ID as a PDF.
  const downloadID = () => {
    window.print();
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
              aria-label={t("openSidebar")}
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-xl font-bold">
                {t("digitalId")}
              </h1>
              <p className="text-xs text-slate-400">
                {t("secureTravelIdentity")}
              </p>
            </div>
          </div>

          <button
            onClick={downloadID}
            className="flex items-center gap-2 rounded-xl bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
          >
            <Download size={17} />
            <span className="hidden sm:inline">
              {t("downloadId")}
            </span>
          </button>
        </header>

        <div className="mx-auto max-w-5xl space-y-8 p-5 sm:p-8">
          {/* Introduction */}
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-teal-400">
              {t("digitalIdentity")}
            </p>

            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("touristIdentityCard")}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {t("digitalIdentityDescription")}
            </p>
          </section>

          {/* Digital ID card */}
          <section className="mx-auto max-w-2xl print-area">
            <div className="overflow-hidden rounded-3xl border border-teal-400/20 bg-slate-900 shadow-2xl shadow-teal-950/20">
              {/* Card heading */}
              <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-teal-500/15 to-blue-500/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                    <ShieldCheck size={30} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {t("appName").toUpperCase()}
                    </h3>
                    <p className="text-xs tracking-widest text-slate-400">
                      {t("digitalTouristIdentity").toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-400">
                    <CheckCircle2 size={14} />
                    {t("demoId")}
                  </span>
                </div>
              </div>

              {/* Tourist details */}
              <div className="grid gap-7 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-400">
                      <User size={36} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        {t("touristName").toUpperCase()}
                      </p>
                      <h3 className="mt-1 text-xl font-bold">
                        {tourist.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {t("citizen", { nationality: t("indian") })}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      {t("touristId").toUpperCase()}
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold tracking-wider text-teal-400">
                      {tourist.id}
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Mail size={17} className="mt-0.5 text-teal-400" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">
                          {t("email").toUpperCase()}
                        </p>
                        <p className="mt-1 break-all text-sm text-slate-300">
                          {tourist.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone size={17} className="mt-0.5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-500">
                          {t("phone").toUpperCase()}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {tourist.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={17} className="mt-0.5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-500">
                          {t("currentCity").toUpperCase()}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {tourist.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Fingerprint size={17} className="mt-0.5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-500">
                          {t("identityType").toUpperCase()}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {t("digitalTourist")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR code */}
                <div className="flex flex-col items-center justify-center">
                  <div className="rounded-2xl bg-white p-3">
                    <QRCodeSVG
                      value={verificationUrl}
                      size={150}
                      level="H"
                      includeMargin
                    />
                  </div>

                  <p className="mt-3 text-xs font-semibold text-teal-400">
                    {t("scanToVerify")}
                  </p>

                  <p className="mt-1 text-center text-xs text-slate-500">
                    {t("qrVerificationDemo")}
                  </p>
                </div>
              </div>

              {/* Card footer */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 bg-slate-950/70 p-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-teal-400" />
                  <div>
                    <p className="text-xs text-slate-500">
                      {t("issuedOn").toUpperCase()}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-300">
                      {tourist.issuedOn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-teal-400" />
                  <div>
                    <p className="text-xs text-slate-500">
                      {t("validUntil").toUpperCase()}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-300">
                      {tourist.validUntil}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Verification information */}
          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                <QrCode size={23} />
              </div>

              <h3 className="font-bold">
                {t("qrCodeVerification")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {t("qrVerificationDescription")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                <Fingerprint size={23} />
              </div>

              <h3 className="font-bold">
                {t("blockchainVerification")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {t("blockchainVerificationDescription")}
              </p>
            </div>
          </section>

          {/* Demo notice */}
          <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5">
            <p className="text-sm font-semibold text-orange-400">
              {t("demoIdentityCard")}
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-400">
              {t("demoIdentityDisclaimer")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DigitalID;
