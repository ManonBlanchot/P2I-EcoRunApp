import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import DetailEvenementPage from "./pages/DetailEvenementPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/detail-event/:eventId" element={<DetailEvenementPage />} />
      <Route path="/create-event" element={<CreateEventPage />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
