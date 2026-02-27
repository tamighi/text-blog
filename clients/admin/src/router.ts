import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

const root = createRootRoute({ component: Root });

const routes = [
  createRoute({
    getParentRoute: () => root,
    path: "/",
    component: HomePage,
  }),

  createRoute({
    getParentRoute: () => root,
    path: "/post",
    component: PostPage,
  }),
];

const routeTree = root.addChildren(routes);

const router = createRouter({ routeTree });

export default router;
