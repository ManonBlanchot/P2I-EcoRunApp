import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FixedBottomNavigation from "../components/Navbar";
import { auth, getUsers } from "../services/firestore";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ProfilPage = () => {
  const [userData, setUserData] = useState([]);

  const uid = auth.currentUser.uid;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersData = await getUsers();
        // Filtrer les données pour récupérer seulement celles de l'utilisateur connecté
        const currentUserData = usersData.filter((user) => user.id === uid);
        setUserData(currentUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [uid]);

  return (
    <div>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "70px" }}>
        <h2>Votre profil</h2>
        {userData.map((user) => (
          <Box
            key={user.id}
            sx={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              color: "black",
              borderRadius: "8px",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
            }}
          >
            <p>Nom: {user.nom}</p>
            <p>Prénom: {user.prenom}</p>
            <p>Email: {user.email}</p>
            <p>Pseudo: {user.pseudo}</p>
            <p>Âge: {user.age}</p>
          </Box>
        ))}
        <Link to="/editProfil" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Modifier mes informations
          </Button>
        </Link>
      </Box>
      <FixedBottomNavigation />
    </div>
  );
};

export default ProfilPage;
