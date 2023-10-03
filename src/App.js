import { useState, useEffect } from "react";

import { auth } from "./services/firebase";

import { AppContext } from "./contexts/AppContext";

import Homepage from "./pages/Homepage";

import Login from "./components/Login";

import "./App.css";

function App() {
  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      <AppContext.Provider value={{ user }}>
        <h1>My Condo App</h1>
        {user ? <Homepage /> : <Login />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
