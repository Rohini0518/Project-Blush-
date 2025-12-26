import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import blushLogo from "../assets/blushlogo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem",
        width: "100%",
        marginTop: "40px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isMobile && (
          <IconButton>
            <SearchIcon />
          </IconButton>
        )}
        <IconButton aria-label="fire">
          <LocalFireDepartmentIcon sx={{ color: "#ff6b35" }} />
        </IconButton>
        {(isMobile || isTablet) && (
          <IconButton aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      <Box
        component="img"
        src={blushLogo}
        alt="Logo"
        sx={{
          height: isMobile ? 80 : 120,
          width: isMobile ? 80 : 120,
          borderRadius: "50%",
          objectFit: "cover",
          position: "absolute",
          left: "50%",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!isMobile && (
          <IconButton>
            <SearchIcon />
          </IconButton>
        )}
        <IconButton aria-label="wishlist">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="add to cart">
          <ShoppingCartIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
