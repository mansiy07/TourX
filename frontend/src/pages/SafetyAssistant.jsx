
import { useState } from "react";
import {
  Menu,
  Bot,
  Send,
  User,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  Route,
  Sparkles,
  Trash2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const suggestions = [
  "How can I stay safe while travelling?",
  "What should I do during an emergency?",
  "How can I identify an unsafe location?",
  "Give me some solo travel safety tips.",
];

const initialMessages = [
  {
    id: 1,
    sender: "assistant",
    text: "Hello! I am your Smart Tourist Safety Assistant. You can ask me about travel safety, emergency preparedness and general safety tips. How can I help you?",
  },
];

function SafetyAssistant() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  // Generate a demo response based on the user's message.
  const getDemoResponse = (message) => {
    const text = message.toLowerCase();

    if (text.includes("emergency") || text.includes("help")) {
      return "If you are in immediate danger, contact local emergency services. Move to a safe and public location if possible, share your location with a trusted contact, and use the SOS feature in the application. Never wait for an AI response before seeking emergency help.";
    }

    if (text.includes("solo") || text.includes("alone")) {
      return "For solo travel, share your itinerary with someone you trust, keep your phone charged, use well-lit public routes, verify your accommodation and avoid sharing live travel details with strangers.";
    }

    if (text.includes("location") || text.includes("area") || text.includes("unsafe")) {
      return "Before visiting an unfamiliar location, check local safety advisories, recent reports, lighting, public transport access and nearby emergency services. This demo cannot verify the live safety status of any location.";
    }

    if (text.includes("route") || text.includes("travel")) {
      return "Plan your route in advance, prefer well-lit and populated roads, keep your navigation active and share your trip details with a trusted contact. Live route risk analysis will be integrated later.";
    }

    return "That is a good safety question. Stay aware of your surroundings, keep emergency contacts accessible and follow verified local safety guidance. Live AI-powered assistance will be available after backend integration.";
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
    setMessages(initialMessages);
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
              <h1 className="text-xl font-bold">AI Safety Assistant</h1>
              <p className="text-xs text-slate-400">
                Your travel safety companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            <span className="text-xs font-medium text-teal-400">
              Demo Mode
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-7 p-5 sm:p-8">
          {/* Introduction */}
          <section>
            <p className="mb-2 text-sm font-semibold tracking-widest text-teal-400">
              SMART TRAVEL ASSISTANCE
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              How can I help you stay safe?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Ask questions about travel safety, emergency preparedness and
              responsible travelling.
            </p>
          </section>

          {/* Assistant information */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <ShieldCheck className="mb-3 text-teal-400" size={25} />
              <h3 className="font-semibold">Safety Guidance</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Get general tips for safer travelling.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <Route className="mb-3 text-blue-400" size={25} />
              <h3 className="font-semibold">Travel Planning</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Learn how to prepare for your journey.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <AlertTriangle className="mb-3 text-orange-400" size={25} />
              <h3 className="font-semibold">Emergency Guidance</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Understand basic emergency precautions.
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
                  <h3 className="font-bold">Safety Assistant</h3>
                  <p className="text-xs text-slate-400">
                    Travel support chatbot
                  </p>
                </div>
              </div>

              <button
                onClick={clearChat}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition hover:bg-red-400/10 hover:text-red-400"
              >
                <Trash2 size={15} />
                Clear Chat
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
                  TRY ASKING
                </div>

                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-teal-400/40 hover:text-teal-400"
                    >
                      {suggestion}
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
                placeholder="Ask something about travel safety..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400/50"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-400 text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
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
              This is a demonstration chatbot with predefined responses. It
              does not access live location, verify real-time threats or
              contact emergency services. In an actual emergency, contact
              local emergency services immediately.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SafetyAssistant;
