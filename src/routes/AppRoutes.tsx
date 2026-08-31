import { Routes, Route } from "react-router";
import FeedPage from "@/pages/FeedPage";
import NewPollPage from "@/pages/NewPollPage";
import NewRoomPage from "@/pages/NewRoomPage";
import MePage from "@/pages/MePage";
import UserPage from "@/pages/UserPage";
import RoomsPage from "@/pages/RoomsPage";
import SearchPage from "@/pages/SearchPage";
import SettingsPage from "@/pages/SettingsPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import GuestRoute from "@/components/auth/GuestRoute";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import LegalPage from "@/pages/LegalPage";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import PrivacyPage from "@/pages/PrivacyPage";
import FaqPage from "@/pages/FaqPage";
import PasswordForgotPage from "@/pages/PasswordForgotPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import OAuthRegisterPage from "@/pages/OAuthRegisterPage";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import ResendVerificationPage from "@/pages/ResendVerificationPage";
import MaintenancePage from "@/pages/MaintenancePage";
import ApiPage from "@/pages/ApiPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ForbiddenPage from "@/pages/ForbiddenPage";
import ServerErrorPage from "@/pages/ServerErrorPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/auth/change-password" element={<ChangePasswordPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

      <Route element={<GuestRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/password-forgot" element={<PasswordForgotPage />} />
        <Route path="/auth/complete-profile" element={<OAuthRegisterPage />} />
        <Route
          path="/auth/verify-email/resend"
          element={<ResendVerificationPage />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/polls/new" element={<NewPollPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/settings/api" element={<ApiPage />} />
        <Route path="/settings/:section?" element={<SettingsPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/rooms/:id" element={<RoomsPage />} />
        <Route path="/rooms/new" element={<NewRoomPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
