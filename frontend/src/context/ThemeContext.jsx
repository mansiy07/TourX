
import { createContext, useContext, useEffect, useState } from "react";

// Create a context for managing the application theme.
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Load the previously selected theme or use dark mode by default.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Apply the selected theme and persist it across browser sessions.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Switch between light and dark themes.
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for accessing the theme context.
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
