import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventsPage from "./pages/EventsPage";
import ProfilPage from "./pages/ProfilPage";
import CreateEventPage from "./pages/CreateEventPage";
import DetailEvenementPage from "./pages/DetailEvenementPage";
import AmisPage from "./pages/AmisPage";
import StatsPage from "./pages/StatsPages";
import ActivitePage from "./pages/ActivitePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/profil" element={<ProfilPage />} />
      <Route path="/amis" element={<AmisPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/activite" element={<ActivitePage />} />
      <Route path="/detail-event/:eventId" element={<DetailEvenementPage />} />
      <Route path="/create-event" element={<CreateEventPage />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
