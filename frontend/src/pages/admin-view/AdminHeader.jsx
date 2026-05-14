import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

const AdminHeader = ({ onSideBarToggle }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
    const { showToast } = useToast();
  
  const handleLogout = async () => {
    try {
    const result=  await dispatch(logoutUser()).unwrap();
    if(result.success){
      showToast("logout successfull","success")
      navigate("/auth/login")
    }
    else{
              showToast("LogOut NotDone", "error");
    }
    } catch (error) {
      showToast("server issue", "error");
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        color: "#222",
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 1, sm: 2 },
          minHeight: { xs: 56, sm: 64 },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <Tooltip title="Toggle Menu">
            <IconButton
              aria-label="toggle menu"
              sx={{
                color: "#444",
                borderRadius: 2,
                "&:hover": { background: "#a5e69e" },
              }}
              onClick={onSideBarToggle}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{
            background: "#c0efbb",
            color: "#1a5c14",
            fontWeight: 600,
            fontSize: { xs: "0.78rem", sm: "0.9rem" },
            px: { xs: 1.5, sm: 2.5 },
            py: { xs: 0.7, sm: 1 },
            borderRadius: 2,
            boxShadow: "none",
            textTransform: "none",
            "&:hover": { background: "#a5e69e", boxShadow: "none" },
            "&:active": { background: "#8fdb87", boxShadow: "none" },
          }}

          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
