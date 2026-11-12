
import { ShieldCheck } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-teal-400" size={24} />
          <span className="font-semibold text-white">Smart Tourist Safety</span>
        </div>
        <p className="text-sm text-slate-500 text-center">
          AI-Powered Smart Tourist Safety & Incident Response System
        </p>
        <p className="text-sm text-slate-500">© 2026 All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
