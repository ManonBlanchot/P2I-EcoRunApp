import FixedBottomNavigation from "../components/Navbar";
import DenseAppBar from "../components/Header";
import "../assets/App.css";
import { getUsers } from "../services/firestore";
import { useState, useEffect } from "react";

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
      <DenseAppBar></DenseAppBar>
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
