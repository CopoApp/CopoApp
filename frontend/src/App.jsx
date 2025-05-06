import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import PetReportForm from "./pages/PetForm"; // ✅ Make sure the filename is correct

export default function App() {
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const loadCurrentUser = async () => {
      const [data] = await checkForLoggedInUser();
      if (data) setCurrentUser(data);
    };
    loadCurrentUser();
  }, [setCurrentUser]);

  return (
    <>
      <SiteHeadingAndNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/report" element={<PetReportForm />} />{" "}
          {/*  Added route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
