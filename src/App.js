import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import WOW from "wow.js";

import SparkFrameApp from "./components/Spark";
import Dashboard from "./components/Dashboard";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize WOW only once per page mount
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 80,
      mobile: true,
      live: false,
      resetAnimation: false,
    });

    wow.init();

    return () => {
      wow.stop();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <main>
        <Routes>
          <Route
            path="/"
            element={<SparkFrameApp />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </main>
    </div>
  );
}