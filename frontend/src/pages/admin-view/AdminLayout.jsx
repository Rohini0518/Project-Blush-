import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div>
      AdminLayout
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
