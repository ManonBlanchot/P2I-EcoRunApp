import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../assets/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, mdp);
      const user = userCredential.user;
      navigate("/events");
      console.log("User logged in: ", user);
    } catch (error) {
      setError("Erreur de connexion, veuillez réessayer.");
      console.error("Error signing in: ", error);
    }
  };

  return (
    <Box className="login-container">
      <h1>Bienvenue sur EcoRun</h1>
      <form onSubmit={handleLogin} className="form">
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
          type="password"
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
          required
        />
        <Button
          className="submit-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          Se connecter
        </Button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <Link className="link" to="/signup">
        <h3>Créer un compte</h3>
      </Link>
    </Box>
  );
};

export default LoginPage;
