import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FixedBottomNavigation from "../components/Navbar";
import { getPerfs } from "../services/firestore";
import { auth } from "../services/firestore";

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
      setUserPerfs(userPerfs);
    }
  }, [perfs]);

  return (
    <div>
      <Header />
      <div
        style={{ textAlign: "center", marginTop: "70px", marginBottom: "60px" }}
      >
        <h2>Vos performances</h2>
        {userPerfs &&
          userPerfs.map((perf) => (
            <div
              key={perf.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                color: "black",
              }}
            >
              <p>Distance parcourue : {perf.distance}</p>
              <p>Temps écoulé : {perf.temps}</p>
            </div>
          ))}
      </div>
      <FixedBottomNavigation />
    </div>
  );
};

export default StatsPage;
