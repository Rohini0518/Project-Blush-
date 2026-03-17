import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import { useState } from "react";
import { Box } from "@mui/material";

const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box>
      <AdminHeader onToggle={handleToggle} />

      <Box sx={{ display: "flex" }}>
        <AdminSideBar open={open} />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
