
import { createBrowserRouter } from "react-router";

import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";

const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
]);

export default router;

