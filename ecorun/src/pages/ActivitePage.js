import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Header from "../components/Header";
import FixedBottomNavigation from "../components/Navbar";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../services/firestore";
import { auth } from "../services/firestore";

function ActivitePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [latActuelle, setLatActuelle] = useState(0);
  const [lonActuelle, setLonActuelle] = useState(0);
  const [previousLat, setPreviousLat] = useState(0);
  const [previousLon, setPreviousLon] = useState(0);
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [courseStarted, setCourseStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const uid = auth.currentUser.uid;

  //Récupérer la position
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const latUser = position.coords.latitude;
            const lonUser = position.coords.longitude;
            // Si premier chargement => mettre la position initiale
            if (previousLat === 0 && previousLon === 0) {
              setPreviousLat(latUser);
              setPreviousLon(lonUser);
            } else {
              // Sinon, mettre la position n-1
              setPreviousLat(latActuelle);
              setPreviousLon(lonActuelle);
            }
            setUserLocation([latitude, longitude]); // Mettre à jour la position
            setLatActuelle(latUser);
            setLonActuelle(lonUser);
          },
          (error) => {
            console.error("Erreur de géolocalisation : ", error);
          }
        );
      } else {
        console.error(
          "La géolocalisation n'est pas supportée par ce navigateur."
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  //Création et initialisation de la map
  useEffect(() => {
    const mapInstance = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance);
    setMap(mapInstance);
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  //Localisation de l'utilisateur sur la carte
  useEffect(() => {
    if (map && userLocation) {
      if (!marker) {
        const newMarker = L.marker(userLocation).addTo(map);
        setMarker(newMarker);
      } else {
        marker.setLatLng(userLocation);
      }
      map.setView(userLocation, 30);
    }
  }, [userLocation, map, marker]);

  //Chronomètre
  useEffect(() => {
    if (courseStarted) {
      const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        setElapsedTime(currentTime - startTime);
      }, 1000); // Mise à jour du temps écoulé toutes les secondes
      return () => clearInterval(intervalId);
    }
  }, [courseStarted, startTime]);

  //Distance parcourue
  useEffect(() => {
    let intervalId;
    if (courseStarted && previousLat !== 0 && previousLon !== 0) {
      intervalId = setInterval(() => {
        const newDistance =
          distance +
          calculateDistance(previousLat, previousLon, latActuelle, lonActuelle);

        setDistance(newDistance);
      }, 5000); // Mettre à jour toutes les 5 secondes
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [
    courseStarted,
    latActuelle,
    lonActuelle,
    previousLat,
    previousLon,
    distance,
  ]);

  const handleClick = () => {
    if (!courseStarted) {
      setStartTime(new Date().getTime()); // Enregistrer le temps de départ
      setUserLocation(null); // Réinitialiser la position utilisateur
      // Réinitialiser les positions
      setPreviousLat(0);
      setPreviousLon(0);
      setLatActuelle(0);
      setLonActuelle(0);
      setDistance(0); // Réinitialiser la distance
    } else {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      setElapsedTime(elapsedTime); // Mettre à jour le temps écoulé

      // Si la course est arrêtée et qu'un temps écoulé est enregistré
      if (elapsedTime !== 0) {
        const currentTime = new Date();
        const day = currentTime.getDate();
        const month = currentTime.toLocaleString("default", { month: "long" });
        const year = currentTime.getFullYear();

        // Formater la date
        const formattedDate = `${day} ${month} ${year}`;

        // Enregistrer les informations finales dans la base de données
        addDoc(collection(db, "Performances"), {
          distance: distance,
          temps: formatTime(elapsedTime),
          utilisateurID: uid,
          date: formattedDate,
        });
      }
    }
    setCourseStarted(!courseStarted); // Inverser l'état de courseStarted
  };

  //Conversion du temps en minutes/secondes
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <Header />
      <p style={{ marginTop: "70px" }}>
        <h3>Distance parcourue : {distance} km</h3>
        {courseStarted && <h3>Temps écoulé : {formatTime(elapsedTime)}</h3>}
      </p>
      <div
        id="map"
        style={{
          height: "calc(100vh - 300px)",
          marginTop: "10px",
          marginBottom: "60px",
        }}
      ></div>
      <button
        onClick={handleClick}
        style={{
          ...styles.button,
          ...(courseStarted ? styles.stopButton : styles.startButton),
        }}
      >
        {courseStarted ? "Arrêter la course" : "Lancer la course"}
      </button>
      <FixedBottomNavigation />
    </div>
  );
}

const styles = {
  button: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "90px",
    padding: "10px 20px",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s ease",
  },
  startButton: {
    background: "#28a745",
  },
  stopButton: {
    background: "#dc3545",
  },
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Calcul de la différence de latitude et de longitude en radians
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  // Calcul de la distance euclidienne en mètres
  const Rterre = 6371e3; // rayon moyen de la Terre en mètres
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  const x = deltaLon * Math.cos((lat1Rad + lat2Rad) / 2);
  const y = deltaLat;
  const distance = Math.sqrt(x * x + y * y) * Rterre;

  return distance;
}

export default ActivitePage;
