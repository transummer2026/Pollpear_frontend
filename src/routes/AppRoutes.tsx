import { Routes, Route } from "react-router";
import AdminPage from "@/pages/SettingsPage";
import FeedPage from "@/pages/FeedPage";
import NewPollPage from "@/pages/NewPollPage";
import NewRoomPage from "@/pages/NewRoomPage";
import ProfilePage from "@/pages/ProfilePage";
import UserPage from "@/pages/UserPage";
import RoomsPage from "@/pages/RoomsPage";
import SettingsPage from "@/pages/SettingsPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import LegalPage from "@/pages/LegalPage";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import PrivacyPage from "@/pages/PrivacyPage";
import PasswordForgotPage from "@/pages/PasswordForgotPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/password-forgot" element={<PasswordForgotPage />} />
      <Route path="/auth/change-password" element={<ChangePasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/rooms/:id" element={<RoomsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/rooms/new" element={<NewRoomPage />} />
        <Route path="/polls/new" element={<NewPollPage />} />
      </Route>
    </Routes>
  );
}
