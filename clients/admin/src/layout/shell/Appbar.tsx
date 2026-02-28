import { useOpenSidebar } from "./OpenSidebarProvider";

const Appbar = () => {
  const { toggle } = useOpenSidebar();
  return (
    <div className="w-full h-appbar bg-elevation-1">
      <button onClick={() => toggle()}>Hello</button>
    </div>
  );
};

export default Appbar;
