import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getEventDetails } from "../services/firestore";
import {
  addParticipantToEvent,
  removeParticipantFromEvent,
} from "../services/firestore";
import Header from "../components/Header";

const DetailEvenementPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(false);

  const fetchEventDetails = async () => {
    const eventData = await getEventDetails(eventId);
    setEvent(eventData);
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const handleJoinEvent = async () => {
    try {
      await addParticipantToEvent(eventId);
      await fetchEventDetails();
      setJoined(true);
    } catch (error) {
      console.error("Error joining event: ", error);
    }
  };

  const handleUnjoinEvent = async () => {
    try {
      await removeParticipantFromEvent(eventId);
      await fetchEventDetails();
      setJoined(false);
    } catch (error) {
      console.error("Error leaving event: ", error);
    }
  };

  return (
    <div>
      <Header></Header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Link to="/events" style={{ textDecoration: "none" }}>
          <Button>
            <ArrowBackIcon></ArrowBackIcon>Retour
          </Button>
        </Link>
        <Box
          sx={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            color: "black",
            borderRadius: "8px",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
          }}
        >
          {event && (
            <div>
              <h2>Détails de l'événement</h2>
              <p>Date : {event.date}</p>
              <p>Heure : {event.heure}</p>
              <p>Lieu : {event.lieu}</p>
              <p>Distance : {event.distance} km</p>
              <p>Rythme : {event.rythme}</p>
              <p>Parcours : {event.parcours}</p>
              <p>Nombre de participants : {event.participants}</p>
              <button
                onClick={joined ? handleUnjoinEvent : handleJoinEvent}
                style={{
                  ...styles.button,
                  ...(joined ? styles.unjoinButton : styles.joinButton),
                }}
              >
                {joined ? "Se désinscrire" : "Rejoindre l'événement"}
              </button>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

const styles = {
  button: {
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s ease",
  },
  joinButton: {
    background: "#28a745",
    color: "#fff",
  },
  unjoinButton: {
    background: "#dc3545",
    color: "#fff",
  },
};

export default DetailEvenementPage;
