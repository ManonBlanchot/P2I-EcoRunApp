import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../services/firestore";
import { getEventDetails } from "../services/firestore";
import { addParticipantToEvent } from "../services/firestore";
import Header from "../components/Header";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const DetailEvenementPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventData = await getEventDetails(eventId);
      setEvent(eventData);
    };

    fetchEventDetails();
  }, [eventId]);

  const handleJoinEvent = async () => {
    try {
      await addParticipantToEvent(eventId);
      navigate("/events");
    } catch (error) {
      console.error("Error joining event: ", error);
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
        <div
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            color: "black",
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleJoinEvent}
              >
                Rejoindre l'événement
              </Button>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default DetailEvenementPage;
