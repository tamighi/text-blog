import { RouterProvider } from "@tanstack/react-router";
import { OpenSidebarProvider } from "./layout/shell/OpenSidebarProvider";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <OpenSidebarProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} basepath="admin" />
      </QueryClientProvider>
    </OpenSidebarProvider>
  );
}

export default App;
