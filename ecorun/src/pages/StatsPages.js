import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FixedBottomNavigation from "../components/Navbar";
import { getPerfs } from "../services/firestore";
import { auth } from "../services/firestore";
import Box from "@mui/material/Box";

const StatsPage = () => {
  const [perfs, setPerfs] = useState(null);
  const [userPerfs, setUserPerfs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const perfData = await getPerfs();
      setPerfs(perfData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (perfs) {
      const uid = auth.currentUser.uid;
      const userPerfs = perfs.filter((perf) => perf.utilisateurID === uid);
      // Trier les performances de la plus ancienne à la plus récente
      userPerfs.sort((a, b) => new Date(a.date) - new Date(b.date));
      userPerfs.reverse();
      setUserPerfs(userPerfs);
    }
  }, [perfs]);

  return (
    <div>
      <Header />
      <Box
        sx={{ textAlign: "center", marginTop: "70px", marginBottom: "60px" }}
      >
        <h2>Vos performances</h2>
        {userPerfs &&
          userPerfs.map((perf) => (
            <Box
              key={perf.id}
              sx={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                color: "black",
                borderRadius: "8px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
              }}
            >
              <p>Date : {perf.date}</p>
              <p>Distance parcourue : {perf.distance}</p>
              <p>Temps écoulé : {perf.temps}</p>
            </Box>
          ))}
      </Box>
      <FixedBottomNavigation />
    </div>
  );
};

export default StatsPage;
