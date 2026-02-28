import { RouterProvider } from "@tanstack/react-router";
import router from "./router";
import { OpenSidebarProvider } from "./components/OpenSidebarProvider";

function App() {
  return (
    <OpenSidebarProvider>
      <RouterProvider router={router} basepath="admin" />
    </OpenSidebarProvider>
  );
}

export default App;
