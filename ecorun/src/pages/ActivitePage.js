import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import Header from '../components/Header';
import FixedBottomNavigation from '../components/Navbar';

function ActivitePage() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
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
    if (userLocation) {
      const map = L.map('map').setView(userLocation, 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker(userLocation).addTo(map);
    }
  }, [userLocation]);

  return <div id="map" style={{ height: 'calc(100vh - 110px)', marginTop: '55px', marginBottom: '55px' }}><Header></Header><FixedBottomNavigation></FixedBottomNavigation></div>; // 100vh - 120px pour laisser 60px de marge en haut et en bas
}

export default ActivitePage;
