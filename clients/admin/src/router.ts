import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LabelPage from "./pages/LabelPage";

const root = createRootRoute({
  component: Root,
});

const homeRoute = createRoute({
  getParentRoute: () => root,
  path: "/",
  component: HomePage,
});

const postRoute = createRoute({
  getParentRoute: () => root,
  path: "/post",
  component: PostPage,
});

const labelRoute = createRoute({
  getParentRoute: () => root,
  path: "/label",
  component: LabelPage,
});

const routeTree = root.addChildren([homeRoute, postRoute, labelRoute]);

const router = createRouter({ routeTree });

export default router;
