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
import UserPage from "./pages/Profile";
import Feed from "./pages/Feed";
import MyReports from "./pages/MyReports";
import Profile from "./pages/Profile";
import PetReportForm from "./pages/PetForm"; 
import ReportDetails from "./pages/ReportDetails";

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
          {/* Auth Paths */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          {/* User Paths */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          {/* Community Feed Paths */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/reports-log" element={<MyReports />} />
          <Route path="/report" element={<PetReportForm />} />
          <Route path="/posts/:id" element={<ReportDetails/>}/>
          <Route path="/users/:id" element={<Profile />} />

          {/* Fallback Path */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
    </>
  );
}
