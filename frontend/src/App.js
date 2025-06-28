import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import AdsList from "./routes/AdsList";
import Auth from "./routes/Auth";
import Profile from "./routes/Profile";
import CreateAd from "./routes/CreateAd";
import DealChat from "./routes/DealChat";
import Dispute from "./routes/Dispute";
import AdminPanel from "./routes/AdminPanel";
import Wallet from "./routes/Wallet";
import Notifications from "./routes/Notifications";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<AdsList />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-ad" element={<CreateAd />} />
        <Route path="/deal/:id" element={<DealChat />} />
        <Route path="/dispute/:id" element={<Dispute />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}
