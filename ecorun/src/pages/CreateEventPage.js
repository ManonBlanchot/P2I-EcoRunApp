import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../services/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { auth } from "../services/firestore";
import Header from "../components/Header";
import { getUserDetails } from "../services/firestore";
import "../assets/CreateEvent.css";

const CreateEventPage = () => {
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [distance, setDistance] = useState("");
  const [lieu, setLieu] = useState("");
  const [parcours, setParcours] = useState("");
  const [rythme, setRythme] = useState("");
  const navigate = useNavigate();
  const [auteur, setAuteur] = useState("");

  const uid = auth.currentUser.uid;

  useEffect(() => {
    const fetchEventDetails = async () => {
      const userData = await getUserDetails(uid);
      const userName = userData.name;
      setAuteur(userName);
    };

    fetchEventDetails();
  }, []);

  const handleEventCreate = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "Evenements"), {
        Date: date,
        Heure: heure,
        Distance: distance,
        Lieu: lieu,
        Parcours: parcours,
        Rythme: rythme,
        Auteur: auteur,
      });

      navigate("/events");
    } catch (error) {
      console.error("Error creating event: ", error);
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
        <Link
          to="/events"
          style={{ textDecoration: "none" }}
          className="retour"
        >
          <Button>
            <ArrowBackIcon></ArrowBackIcon>Retour
          </Button>
        </Link>
        <div className="form">
          <form onSubmit={handleEventCreate}>
            <TextField
              label="Date"
              variant="outlined"
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <TextField
              label="Heure"
              variant="outlined"
              margin="normal"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              required
            />
            <TextField
              label="Distance"
              variant="outlined"
              margin="normal"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
            <TextField
              label="Lieu"
              variant="outlined"
              margin="normal"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
              required
            />
            <TextField
              label="Parcours"
              variant="outlined"
              margin="normal"
              value={parcours}
              onChange={(e) => setParcours(e.target.value)}
              required
            />
            <TextField
              type="number"
              label="Rythme"
              variant="outlined"
              margin="normal"
              value={rythme}
              onChange={(e) => setRythme(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Publier l'évènement
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default CreateEventPage;
