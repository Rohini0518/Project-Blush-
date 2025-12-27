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
        padding: "0.5rem",
        backgroundColor:"#deeedcff"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!isMobile && (
          <IconButton aria-label="fire">
            <LocalFireDepartmentIcon sx={{ fontSize: 36 , color: "#ff6b35" }} />
          </IconButton>
        )}

        {(isMobile || isTablet) && (<>
        
          <IconButton aria-label="menu" sx={{ color: "#000" }}>
            <MenuIcon sx={{ fontSize: 36 }} />
          </IconButton>
          <IconButton sx={{ color: "#000" }}>
          <SearchIcon sx={{ fontSize:32 }} />
        </IconButton>
          </>
        )}
      </Box>
       <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          flex: 1, 
        }}
      >
      <Box
        component="img"
        src={blushLogo}
        alt="Logo"
        sx={{
          height: isMobile ? 80 : 120,
          width: isMobile ? 80 : 120,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!isMobile&&
        <IconButton sx={{ color: "#000" }}>
          <SearchIcon sx={{ fontSize:isMobile?32: 36 }} />
        </IconButton>}
        <IconButton aria-label="wishlist" sx={{ color: "#000" }}>
          <FavoriteBorderIcon sx={{ fontSize:isMobile?32: 36 }} />
        </IconButton>
        <IconButton aria-label="add to cart" sx={{ color: "#000" }}>
          <ShoppingCartIcon sx={{fontSize:isMobile?32: 36 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
