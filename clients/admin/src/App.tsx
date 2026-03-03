import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { OpenSidebarProvider } from "./layout/shell/OpenSidebarProvider";
import { ToastProvider } from "./layout/toast/ToastProvider";
import router from "./router";

const queryClient = new QueryClient();

function App() {
  return (
    <OpenSidebarProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} basepath="admin" />
        </QueryClientProvider>
      </ToastProvider>
    </OpenSidebarProvider>
  );
}

export default App;
