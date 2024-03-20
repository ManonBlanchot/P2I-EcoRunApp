import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { collection, addDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "../services/firestore";
import "../assets/LoginPage.css";
import { auth } from "../services/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";

export const signUpWithEmailAndPassword = async (
  email,
  mdp,
  nom,
  prenom,

  pseudo,

  age
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      mdp
    );
    const user = userCredential.user;

    await createUserDocument(user.uid, nom, prenom, email, pseudo, mdp, age);
    return user;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

const createUserDocument = async (
  uid,
  nom,
  prenom,
  email,
  pseudo,
  mdp,
  age
) => {
  try {
    await setDoc(doc(db, "Utilisateurs", uid), {
      Nom: nom,
      Prenom: prenom,
      Email: email,
      Pseudo: pseudo,
      Mdp: mdp,
      Age: age,
    });
  } catch (error) {
    console.error("Error creating user document: ", error);
    throw error;
  }
};

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
      signUpWithEmailAndPassword(
        email,
        mdp,
        nom,
        prenom,

        pseudo,

        age
      );

      navigate("/events");
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  return (
    <div>
      <Box className="login-container">
        <h1>Créer un compte</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <form onSubmit={handleSignup} className="form">
            <TextField
              className="textfield"
              label="Nom"
              variant="outlined"
              margin="normal"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <TextField
              className="textfield"
              label="Prénom"
              variant="outlined"
              margin="normal"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
            <TextField
              className="textfield"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              className="textfield"
              label="Pseudo"
              variant="outlined"
              margin="normal"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
            <TextField
              className="textfield"
              type="password"
              label="Mot de passe"
              variant="outlined"
              margin="normal"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              required
            />
            <TextField
              className="textfield"
              type="number"
              label="Âge"
              variant="outlined"
              margin="normal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-button"
            >
              Créer un compte
            </Button>
          </form>
          <Link to="/login">
            <h3>Déjà un compte ? Connectez-vous</h3>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default SignupPage;
