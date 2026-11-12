import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalBackButton from "./components/GlobalBackButton";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import SafeRoutes from "./pages/SafeRoutes";
import Emergency from "./pages/Emergency";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AIRiskDashboard from "./pages/AIRiskDashboard";
import Notifications from "./pages/Notifications";
import SafetyAssistant from "./pages/SafetyAssistant";
import DigitalID from "./pages/DigitalID";
import Documents from "./pages/Documents";

function App() {
  return (
    <BrowserRouter>
      <GlobalBackButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/safe-routes" element={<SafeRoutes />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai-risk-dashboard" element={<AIRiskDashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/safety-assistant" element={<SafetyAssistant />} />
        <Route path="/digital-id" element={<DigitalID />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;