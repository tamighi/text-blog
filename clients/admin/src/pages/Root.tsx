import Appbar from "@/components/Appbar";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div className="flex flex-col bg-elevation-0 text-fg-primary">
      <Appbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
