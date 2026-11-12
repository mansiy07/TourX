
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function GlobalBackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    const historyIndex = window.history.state?.idx;

    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      title="Go back"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-teal-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-600"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </button>
  );
}

export default GlobalBackButton;
