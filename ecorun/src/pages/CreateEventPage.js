import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
      const userPseudo = userData.pseudo;
      setAuteur(userPseudo);
    };

    fetchEventDetails();
  }, []);

  const handleEventCreate = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "Evenements"), {
        date: date,
        heure: heure,
        distance: distance,
        lieu: lieu,
        parcours: parcours,
        rythme: rythme,
        auteur: auteur,
        participants: 1,
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
              type="date"
              variant="outlined"
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <TextField
              type="time"
              variant="outlined"
              margin="normal"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              required
            />
            <TextField
              type="number"
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Parcours</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parcours}
                label="Parcours"
                onChange={(e) => setParcours(e.target.value)}
              >
                <MenuItem value={"P1"}>P1</MenuItem>
                <MenuItem value={"P2"}>P2</MenuItem>
                <MenuItem value={"P3"}>P3</MenuItem>
                <MenuItem value={"P4"}>P4</MenuItem>
                <MenuItem value={"Personnalisé"}>Personnalisé</MenuItem>
              </Select>
            </FormControl>
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
