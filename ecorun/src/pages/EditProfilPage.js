import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { editProfile } from "../services/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { auth } from "../services/firestore";
import Header from "../components/Header";

import "../assets/CreateEvent.css";

const EditProfilPage = () => {
  const [pseudo, setPseudo] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const uid = auth.currentUser.uid;

  const handleEditProfile = () => {
    editProfile(uid, pseudo, age);
    navigate("/profil");
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
          to="/profil"
          style={{ textDecoration: "none" }}
          className="retour"
        >
          <Button>
            <ArrowBackIcon></ArrowBackIcon>Retour
          </Button>
        </Link>
        <div className="form">
          <form onSubmit={handleEditProfile}>
            <TextField
              variant="outlined"
              margin="normal"
              value={pseudo}
              label="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={age}
              label="Age"
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Modifier les informations
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default EditProfilPage;
