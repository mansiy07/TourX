import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main>
      {/* Render the selected route */}
      <Outlet />
    </main>
  );
}

export default MainLayout;