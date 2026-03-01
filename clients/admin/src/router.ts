import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

const root = createRootRoute({
  component: Root,
});

const homeRoute = createRoute({
  getParentRoute: () => root,
  path: "/",
  component: HomePage,
});

const postsRoute = createRoute({
  getParentRoute: () => root,
  path: "/post",
  component: PostPage,
});

const routeTree = root.addChildren([homeRoute, postsRoute]);

const router = createRouter({ routeTree });

export default router;
