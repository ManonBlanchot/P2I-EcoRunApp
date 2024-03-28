import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import Header from '../components/Header';
import FixedBottomNavigation from '../components/Navbar';

function ActivitePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [courseStarted, setCourseStarted] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setInitialPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Erreur de géolocalisation : ', error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  }, []);

  useEffect(() => {
    const mapInstance = L.map('map').setView([51.505, -0.09], 13); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);
    setMap(mapInstance);
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      };
    }
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
    if (userLocation) {
      if (initialPosition) {
        const newDistance = calculateDistance(initialPosition, userLocation);
        setDistance(newDistance);
      }
    }
  }, [initialPosition, userLocation]);

  useEffect(() => {
    if (userLocation && initialPosition && courseStarted) {
      const newDistance = calculateDistance(initialPosition, userLocation);
      setDistance(newDistance);
    }
  }, [initialPosition, userLocation, courseStarted]);

  const handleClick = () => {
    if (!courseStarted) {
      setInitialPosition(userLocation);
    }
    setCourseStarted(!courseStarted);
  };

  const calculateDistance = (start, end) => {
    const [lat1, lon1] = start;
    const [lat2, lon2] = end;
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };
  return (
    <div>
      <Header />
      <p style={{ marginTop: '70px' }}><h3>Distance parcourue : {distance.toFixed(2)} km</h3></p>
      <div id="map" style={{ height: 'calc(100vh - 300px)', marginTop: '10px', marginBottom: '60px' }}></div>
      <button onClick={handleClick} style={{ ...styles.button, ...(courseStarted ? styles.stopButton : styles.startButton) }}>{courseStarted ? 'Arrêter la course' : 'Lancer la course'}</button>
      <FixedBottomNavigation />
    </div>
  );
}

const styles = {
    button: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '90px',
      padding: '10px 20px',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background 0.3s ease',
    },
    startButton: {
      background: '#28a745', // vert
    },
    stopButton: {
      background: '#dc3545', // rouge
    }
  };
export default ActivitePage;
