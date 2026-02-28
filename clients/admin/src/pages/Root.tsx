import Sidebar from "@/components/Sidebar";
import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div>
      <Sidebar />
      <div>BasePage</div>
      <Outlet />
    </div>
  );
};

export default Root;
