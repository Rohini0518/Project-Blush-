import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import { useState } from "react";
import { Box } from "@mui/material";

const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    const handleSideBarToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Box>
      <AdminHeader onSideBarToggle={handleSideBarToggle} />

      <Box sx={{ display: "flex" }}>
        <AdminSideBar open={open} onSideBarToggle={handleSideBarToggle}  setOpen={setOpen}/>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
