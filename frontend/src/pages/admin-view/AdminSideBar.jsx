import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AdminSideMenuItems from "./AdminSideMenuItems";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function AdminSideBar({ open, onSideBarToggle ,setOpen}) {
  return (
    <Box
      component="aside"
      sx={{
        width: open ? 260 : 0,
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
          justifyContent: "space-between",
          px: 2.5,
          py: 2.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AutoGraphIcon sx={{ fontSize: 30, color: "#1a1a2e" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#1a1a2e" }}
          >
            Admin Panel
          </Typography>
        </Box>

        <IconButton onClick={onSideBarToggle}>
          <CloseIcon sx={{border:"1px solid green",borderRadius:"10px",padding:"2px"}}/>
        </IconButton>
      </Box>
      <AdminSideMenuItems setOpen={setOpen}/>
    </Box>
  );
}

export default AdminSideBar;
