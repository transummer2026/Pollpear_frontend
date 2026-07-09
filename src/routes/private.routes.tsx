import AdminPage from "@/pages/SettingsPage";
import FeedPage from "@/pages/FeedPage";
import NewPollPage from "@/pages/NewPollPage";
import NewRoomPage from "@/pages/NewRoomPage";
import ProfilePage from "@/pages/ProfilePage";
import RoomsPage from "@/pages/RoomsPage";
import SettingsPage from "@/pages/SettingsPage";

export const privateRoutes = [
  {
    path: "/feed",
    element: <FeedPage />,
  },
  {
    path: "/profile/me",
    element: <ProfilePage />,
  },
  // {
  // 	path: "/profile/:id",
  // 	element: <ProfilePage />,
  // },
  {
    path: "/rooms/:id",
    element: <RoomsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/rooms/new",
    element: <NewRoomPage />,
  },
  {
    path: "/polls/new",
    element: <NewPollPage />,
  },
];
