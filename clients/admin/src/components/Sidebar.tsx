import { Link } from "@tanstack/react-router";

const Sidebar = () => {
  return (
    <div className="h-screen w-24 bg-blue-200">
      <div className="flex flex-col gap-4">
        <Link to="/">Home</Link>
        <Link to="/post">Post</Link>
      </div>
    </div>
  );
};

export default Sidebar;
