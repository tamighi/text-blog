import Appbar from "@/layout/shell/Appbar";
import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen bg-elevation-0">
      <Appbar />

      <Outlet />
    </div>
  );
};

export default Root;
