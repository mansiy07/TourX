
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  Bot,
  Send,
  User,
  ShieldCheck,
  AlertTriangle,
  Route,
  Sparkles,
  Trash2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const suggestions = [
  "suggestionTravelSafety",
  "suggestionEmergency",
  "suggestionUnsafeLocation",
  "suggestionSoloTravel",
];

function SafetyAssistant() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: t("assistantWelcome"),
    },
  ]);
  const [input, setInput] = useState("");

  // Generate a demo response based on the user's message.
  const getDemoResponse = (message) => {
    const text = message.toLowerCase();

    if (text.includes("emergency") || text.includes("help")) {
      return t("assistantEmergencyResponse");
    }

    if (text.includes("solo") || text.includes("alone")) {
      return t("assistantSoloTravelResponse");
    }

    if (
      text.includes("location") ||
      text.includes("area") ||
      text.includes("unsafe")
    ) {
      return t("assistantLocationResponse");
    }

    if (text.includes("route") || text.includes("travel")) {
      return t("assistantTravelResponse");
    }

    return t("assistantDefaultResponse");
  };

  // Add a user message and its demo response.
  const sendMessage = (message = input) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      sender: "assistant",
      text: getDemoResponse(trimmedMessage),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  // Clear the current conversation.
  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "assistant",
        text: t("assistantWelcome"),
      },
    ]);
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
                {t("safetyAssistant")}
              </h1>
              <p className="text-xs text-slate-400">
                {t("safetyAssistantSubtitle")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            <span className="text-xs font-medium text-teal-400">
              {t("demoMode")}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-7 p-5 sm:p-8">
          {/* Introduction */}
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-teal-400">
              {t("smartTravelAssistance")}
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t("howCanIHelpYouStaySafe")}
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {t("safetyAssistantIntroduction")}
            </p>
          </section>

          {/* Assistant information */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <ShieldCheck className="mb-3 text-teal-400" size={25} />
              <h3 className="font-semibold">
                {t("safetyGuidance")}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {t("safetyGuidanceDescription")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <Route className="mb-3 text-blue-400" size={25} />
              <h3 className="font-semibold">
                {t("travelPlanning")}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {t("travelPlanningDescription")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <AlertTriangle className="mb-3 text-orange-400" size={25} />
              <h3 className="font-semibold">
                {t("emergencyGuidance")}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {t("emergencyGuidanceDescription")}
              </p>
            </div>
          </section>

          {/* Chat interface */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">
                    {t("safetyAssistant")}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t("travelSupportChatbot")}
                  </p>
                </div>
              </div>

              <button
                onClick={clearChat}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition hover:bg-red-400/10 hover:text-red-400"
              >
                <Trash2 size={15} />
                {t("clearChat")}
              </button>
            </div>

            {/* Conversation area */}
            <div className="flex min-h-[380px] max-h-[520px] flex-col gap-5 overflow-y-auto p-5 sm:p-7">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      message.sender === "user"
                        ? "bg-blue-400/10 text-blue-400"
                        : "bg-teal-400/10 text-teal-400"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={19} />
                    ) : (
                      <Bot size={19} />
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 sm:max-w-[75%] ${
                      message.sender === "user"
                        ? "rounded-tr-sm bg-teal-400 text-slate-950"
                        : "rounded-tl-sm border border-white/10 bg-slate-950 text-slate-300"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested questions */}
            {messages.length === 1 && (
              <div className="border-t border-white/10 px-5 py-5 sm:px-7">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Sparkles size={15} className="text-teal-400" />
                  {t("tryAsking")}
                </div>

                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(t(suggestion))}
                      className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-teal-400/40 hover:text-teal-400"
                    >
                      {t(suggestion)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message input */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-3 border-t border-white/10 p-4 sm:p-5"
            >
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("askTravelSafety")}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400/50"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-400 text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={t("sendMessage")}
              >
                <Send size={19} />
              </button>
            </form>
          </section>

          {/* Safety disclaimer */}
          <div className="flex items-start gap-3 rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-orange-400"
            />
            <p className="text-xs leading-6 text-slate-400">
              {t("safetyAssistantDisclaimer")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SafetyAssistant;
