import { Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div>
      <div>BasePage</div>
      <Outlet />
    </div>
  );
};

export default Root;
