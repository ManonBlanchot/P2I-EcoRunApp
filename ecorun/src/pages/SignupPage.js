// SignupPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firestore";

const SignupPage = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [mdp, setMdp] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      // Création du compte utilisateur avec Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        mdp
      );
      const user = userCredential.user;
      console.log("User created: ", user);

      // Enregistrement des infos dans Firestore
      await db.collection("Utilisateurs").doc(user.uid).set({
        nom,
        prenom,
        email,
        pseudo,
        age,
      });

      navigate("/events");
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSignup}>
        <TextField
          label="Nom"
          variant="outlined"
          margin="normal"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <TextField
          label="Prénom"
          variant="outlined"
          margin="normal"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Pseudo"
          variant="outlined"
          margin="normal"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
          required
        />
        <TextField
          type="number"
          label="Âge"
          variant="outlined"
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Créer un compte
        </Button>
      </form>
      <Link to="/login">Déjà un compte ? Connectez-vous</Link>
    </Box>
  );
};

export default SignupPage;
