import { Link } from "@tanstack/react-router";

const Appbar = () => {
  return (
    <div className="w-full bg-elevation-1">
      <div className="flex font-bold text-xl gap-8 p-4">
        <Link to="/post">Posts</Link>
        <Link to="/label">Labels</Link>
      </div>
    </div>
  );
};

export default Appbar;
