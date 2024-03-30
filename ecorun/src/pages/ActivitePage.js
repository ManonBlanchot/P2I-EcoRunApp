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
  const [initialPosition, setInitialPosition] = useState(null);
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [courseStarted, setCourseStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const uid = auth.currentUser.uid;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setInitialPosition([latitude, longitude]);
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
  }, []);

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

  useEffect(() => {
    if (userLocation && initialPosition && courseStarted) {
      const intervalId = setInterval(() => {
        const newDistance = calculateDistance(initialPosition, userLocation);
        setDistance(newDistance);
      }, 10000); // = 10 secondes
      return () => clearInterval(intervalId);
    }
  }, [initialPosition, userLocation, courseStarted]);

  useEffect(() => {
    if (courseStarted) {
      const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        setElapsedTime(currentTime - startTime);
      }, 1000); // Mise à jour du temps écoulé toutes les secondes
      return () => clearInterval(intervalId);
    }
  }, [courseStarted, startTime]);

  const handleClick = () => {
    if (!courseStarted) {
      setStartTime(new Date().getTime());
    }
    setCourseStarted(!courseStarted);
    if (elapsedTime !== 0) {
      addDoc(collection(db, "Performances"), {
        distance: distance,
        temps: formatTime(elapsedTime),
        utilisateurID: uid,
      });
    }
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
        <h3>Distance parcourue : {distance.toFixed(2)} km</h3>
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

// fonction qui calcule la distance à partir de deux coordonnées GPS
function calculateDistance(point1, point2) {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  //Conversion des latitudes en radian
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;

  //Différence de latitude/longitude + conversion en radian
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  //Calcul de la distance géodésique
  //Permet d'avoir la distance réelle en prenant en compte la courbure de la terre
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const R = 6371e3; // rayon moyen de la terre, utilisée comme référence pour la conversion en mètres
  const distance = R * c; // conversion en mètres
  return distance / 1000; // conversion en km
}

export default ActivitePage;
