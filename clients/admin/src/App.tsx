import { RouterProvider } from "@tanstack/react-router";
import { OpenSidebarProvider } from "./layout/shell/OpenSidebarProvider";
import router from "./router";

function App() {
  return (
    <OpenSidebarProvider>
      <RouterProvider router={router} basepath="admin" />
    </OpenSidebarProvider>
  );
}

export default App;
