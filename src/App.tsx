/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/industry" element={<IndustryDashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/training" element={<Training />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
}
