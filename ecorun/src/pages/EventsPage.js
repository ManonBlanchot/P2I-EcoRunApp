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
      setEvents(eventData);
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
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h2>Rejoindre un événement</h2>
        {events &&
          events.map((event) => (
            <Link
              key={event.id}
              to={`/detail-event/${event.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px",
                  color: "black",
                }}
              >
                <p>Nom de l'utilisateur : {event.auteur}</p>
                <p>Lieu de départ : {event.lieu}</p>
                <p>Heure : {event.heure}</p>
                <p>Distance : {event.distance} km</p>
                <Button variant="contained" color="primary">
                  Voir plus
                </Button>
              </div>
            </Link>
          ))}
      </div>
      <FixedBottomNavigation />
    </div>
  );
};

export default EventsPage;
