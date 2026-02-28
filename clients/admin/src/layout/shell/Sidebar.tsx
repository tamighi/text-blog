import { Link } from "@tanstack/react-router";
import { useOpenSidebar } from "./OpenSidebarProvider";

const Sidebar = () => {
  const { isOpen } = useOpenSidebar();

  return (
    <div
      className="bg-elevation-1 h-sidebar-fill flex-col gap-4 p-2"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <Link to="/">Home</Link>
      <Link to="/post">Post</Link>
    </div>
  );
};

export default Sidebar;
