/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import IndustryDashboard from "./pages/IndustryDashboard";
import Marketplace from "./pages/Marketplace";
import Training from "./pages/Training";
import Funding from "./pages/Funding";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Logout from "./pages/Logout";
import AdminPanel from "./pages/AdminPanel";
import FarmMonitor from "./pages/FarmMonitor";

/* 🔐 PROTECTED ROUTE (ROLE-BASED ACCESS CONTROL) */
function ProtectedRoute(props: { children: JSX.Element; allowedRoles?: string[] }) {
  const { children, allowedRoles } = props;
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        navigate("/login");
        return;
      }

      if (allowedRoles && allowedRoles.length > 0) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (error || !profile) {
          navigate("/login");
          return;
        }

        // Superuser admin role bypasses all role constraints.
        // Other roles are restricted to the allowed roles list.
        if (profile.role !== "admin" && !allowedRoles.includes(profile.role)) {
          if (profile.role === "farmer") {
            navigate("/farmer");
          } else if (profile.role === "industry") {
            navigate("/industry");
          } else {
            navigate("/");
          }
          return;
        }
      }

      setChecking(false);
    }

    checkAuth();
  }, [navigate]);

  if (checking) return <div style={{ padding: "20px" }}>Checking authentication...</div>;

  return children;
}

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/logout";

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/farmer"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/industry"
          element={
            <ProtectedRoute allowedRoles={["industry"]}>
              <IndustryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marketplace"
          element={
            <ProtectedRoute allowedRoles={["industry"]}>
              <Marketplace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/training"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <Training />
            </ProtectedRoute>
          }
        />

        <Route
          path="/funding"
          element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <Funding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["industry"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <ProtectedRoute allowedRoles={["industry"]}>
              <Confirmation />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/monitor"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <FarmMonitor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
