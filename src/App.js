import { useEffect, useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import { auth } from "./services/firebase";

import { AppContext } from "./contexts/AppContext";

import DashboardPage from "./pages/Dashboard";
import HomePage from "./pages/Homepage";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import IssuesPage from "./pages/IssuesPage";
import MarketplacePage from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

import Layout from "./components/layouts/base";

import "./App.css";


const router = createBrowserRouter(
    createRoutesFromElements((
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="issues" element={<IssuesPage />} />
            <Route path="issues/:issueID" element={<IssueDetailsPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    ))
)


function App() {
  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((userState) => {
      setUser(userState);
    });
  }, []);

  return (
    <AppContext.Provider value={{ user }}>
        <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
