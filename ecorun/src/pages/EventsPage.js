import React, { useState, useEffect } from "react";
import { getEvents } from "../services/firestore";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import FixedBottomNavigation from "../components/Navbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const EventsPage = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await getEvents();
      // Filtrer les événements dont la date est postérieure ou égale à aujourd'hui
      const filteredEvents = eventData.filter(
        (event) => new Date(event.date) > new Date()
      );
      // Trier les événements filtrés par date
      filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents(filteredEvents);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "70px" }}>
        <h2>Nouvel événement</h2>
        <Link to="/create-event" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Créer un nouvel événement
          </Button>
        </Link>
      </Box>
      <Box sx={{ textAlign: "center", marginBottom: "60px" }}>
        <h2>Rejoindre un événement</h2>
        {events &&
          events.map((event) => (
            <Link
              key={event.id}
              to={`/detail-event/${event.id}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                key={event.id}
                sx={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px",
                  color: "black",
                  borderRadius: "8px",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
                }}
              >
                <p>Nom de l'utilisateur : {event.auteur}</p>
                <p>Date : {event.date}</p>
                <p>Heure : {event.heure}</p>
                <p>Lieu de départ : {event.lieu}</p>
                <p>Distance : {event.distance} km</p>
                <Button variant="contained" color="primary">
                  Voir plus
                </Button>
              </Box>
            </Link>
          ))}
      </Box>
      <FixedBottomNavigation />
    </div>
  );
};

export default EventsPage;
