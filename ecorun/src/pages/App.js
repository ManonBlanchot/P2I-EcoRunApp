import FixedBottomNavigation from "../components/Navbar";
import "../assets/App.css";
import { getUsers } from "../services/firestore";
import { useState, useEffect } from "react";
import Header from "../components/Header";

function App() {
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
}

export default App;
