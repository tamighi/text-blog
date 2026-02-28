import { useOpenSidebar } from "./OpenSidebarProvider";

const Sidebar = () => {
  const { isOpen } = useOpenSidebar();

  return (
    <div
      className="bg-elevation-1 min-h-sidebar-fill"
      style={{ display: isOpen ? "block" : "none" }}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
