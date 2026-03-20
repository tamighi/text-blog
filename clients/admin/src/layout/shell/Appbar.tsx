import { Link } from "@tanstack/react-router";

const Appbar = () => {
  return (
    <div className="w-full h-appbar bg-elevation-1">
      <div className="flex gap-4">
        <Link to="/post">Posts</Link>
        <Link to="/label">Labels</Link>
      </div>
    </div>
  );
};

export default Appbar;
