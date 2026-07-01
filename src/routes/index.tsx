
import { createBrowserRouter } from "react-router";

import { publicRoutes } from "@/routes/public.routes";
import { privateRoutes } from "@/routes/private.routes";

const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
]);

export default router;

