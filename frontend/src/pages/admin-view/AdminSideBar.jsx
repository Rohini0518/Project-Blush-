import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AdminSideMenuItems from "./AdminSideMenuItems";


function AdminSideBar({open}) {
  return (
    <Box
      component="aside"
      sx={{
        width:open? 256:0,
        overflow: "hidden",   
        transition: "0.2s",   
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #e0e0e0",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2.5,
          py: 2.5,
          cursor: "pointer",
        }}
      >
        <AutoGraphIcon sx={{ fontSize: 30, color: "#1a1a2e" }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#1a1a2e" }}
        >
          AdminPanel
        </Typography>
      </Box>
      <AdminSideMenuItems/>
    </Box>
  );
}

export default AdminSideBar;