import { useContext, useEffect } from "react";

import { auth } from "../services/firebase";

import { AppContext } from "../contexts/AppContext";

import "../App.css";

const Homepage = () => {
  const { user } = useContext(AppContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="home">
      <h1>
        Hello, <span></span>
        {user.displayName}
      </h1>
      <img src={user.photoURL} alt={`User ${user.displayName}'s avatar`} />
      <button className="button signout" onClick={() => auth.signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default Homepage;
