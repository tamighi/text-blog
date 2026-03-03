import Button from "@/components/Button";
import { useOpenSidebar } from "./OpenSidebarProvider";

const Appbar = () => {
  const { toggle } = useOpenSidebar();
  return (
    <div className="w-full h-appbar bg-elevation-1">
      <Button onClick={() => toggle()}>Hello</Button>
    </div>
  );
};

export default Appbar;
