import React from "react";
import { useState, useEffect } from "react";
import { getUsers } from "../services/firestore";
import FixedBottomNavigation from "../components/Navbar";
import Header from "../components/Header";

const EventsPage = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <FixedBottomNavigation></FixedBottomNavigation>
      <Header></Header>
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.lastName}</p>
          </div>
        ))}
    </div>
  );
};

export default EventsPage;
