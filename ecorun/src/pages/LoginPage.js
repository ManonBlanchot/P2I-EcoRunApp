import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, mdp);
      const user = userCredential.user;
      console.log("User logged in: ", user);

      // authentification réussie => page evenement
      navigate("/events");
    } catch (error) {
      console.error("Error signing in: ", error);
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
      <form onSubmit={handleLogin}>
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
          type="password"
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Se connecter
        </Button>
      </form>
      <Link to="/signup">Créer un compte</Link>
    </Box>
  );
};

export default LoginPage;
