import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../services/firestore";
import "../assets/LoginPage.css";
import { auth } from "../services/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const signUpWithEmailAndPassword = async (
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
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Adresse e-mail déjà utilisée");
    } else {
      console.error("Error signing up: ", error);
      throw error;
    }
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
      nom: nom,
      prenom: prenom,
      email: email,
      pseudo: pseudo,
      mdp: mdp,
      age: age,
    });
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Adresse e-mail déjà utilisée");
    } else {
      console.error("Error signing up: ", error);
      throw error;
    }
  }
};

const SignupPage = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [mdp, setMdp] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await signUpWithEmailAndPassword(email, mdp, nom, prenom, pseudo, age);
      navigate("/events");
    } catch (error) {
      if (error.message === "Adresse e-mail déjà utilisée") {
        setErrorMessage("Adresse e-mail déjà utilisée");
      } else {
        console.error("Error signing up: ", error);
      }
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
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
