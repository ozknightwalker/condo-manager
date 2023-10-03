import { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { auth } from "./services/firebase";

import { AppContext } from "./contexts/AppContext";

import DashboardPage from "./pages/Dashboard";
import HomePage from "./pages/Homepage";
import IssuesPage from "./pages/IssuesPage";
import MarketplacePage from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

import Layout from "./components/layouts/base";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/issues",
    element: <IssuesPage />,
  },
  {
    path: "/market",
    element: <MarketplacePage />,
  },
  {
    path: "*",
    element: <NotFound />
  },
]);


function App() {
  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((userState) => {
      setUser(userState);
    });
  }, []);

  return (
    <div>
        <AppContext.Provider value={{ user }}>
        <Layout>
            <RouterProvider router={router} />
        </Layout>
        </AppContext.Provider>
    </div>
  );
}

export default App;
