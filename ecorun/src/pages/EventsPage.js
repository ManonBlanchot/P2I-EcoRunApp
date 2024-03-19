import React from "react";
import { useState, useEffect } from "react";
import { getEvents } from "../services/firestore";
import FixedBottomNavigation from "../components/Navbar";
import Header from "../components/Header";

const EventsPage = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await getEvents();
      setEvent(eventData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <FixedBottomNavigation></FixedBottomNavigation>
      <Header></Header>
      {event &&
        event.map((events) => (
          <div key={events.id}>
            <p>{events.date}</p>
            <p>{events.heure}</p>
            <p>{events.distance}</p>
            <p>{events.lieu}</p>
            <p>{events.parcours}</p>
            <p>{events.rythme}</p>
          </div>
        ))}
    </div>
  );
};

export default EventsPage;
