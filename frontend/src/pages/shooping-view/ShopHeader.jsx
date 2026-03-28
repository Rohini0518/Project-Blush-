import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import blushLogo from "../../assets/blushlogo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ShopHeader({ search, setSearch }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 1.5, sm: 3, md: 4 },
        py: 1,
        backgroundColor: "#fff",
        borderBottom: "1px solid #f0ece6",
        boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flex: 1 }}>
        {isMobile || isTablet ? (
          <>
            <IconButton aria-label="menu" sx={{ color: "#555" }}>
              <MenuIcon sx={{ fontSize: 26 }} />
            </IconButton>
            <IconButton sx={{ color: "#555" }}>
              <SearchIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </>
        ) : (
          <IconButton aria-label="fire" sx={{ color: "#ff6b35" }}>
            <LocalFireDepartmentIcon sx={{ fontSize: 28 }} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
        <Box
          component="img"
          src={blushLogo}
          alt="Logo"
          sx={{
            height: isMobile ? 56 : 68,
            width: isMobile ? 56 : 68,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #f0ece6",
            boxShadow: "0 2px 10px rgba(197,168,130,0.25)",
            transition: "transform 0.25s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {!isMobile && !isTablet && (
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: "#aaa" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "220px",
              mr: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "24px",
                fontSize: "0.82rem",
                backgroundColor: "#faf9f7",
                "& fieldset": { borderColor: "#e8e0d8" },
                "&:hover fieldset": { borderColor: "#c5a882" },
                "&.Mui-focused fieldset": {
                  borderColor: "#c5a882",
                  borderWidth: "1.5px",
                },
              },
            }}
          />
        )}

        <IconButton
          sx={{
            color: "#555",
            transition: "color 0.2s ease, transform 0.2s ease",
            "&:hover": { color: "#e05c7a", transform: "scale(1.1)" },
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: isMobile ? 24 : 22 }} />
        </IconButton>

        <IconButton
          sx={{
            color: "#555",
            transition: "color 0.2s ease, transform 0.2s ease",
            "&:hover": { color: "#c5a882", transform: "scale(1.1)" },
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: isMobile ? 24 : 22 }} />
        </IconButton>
        <IconButton
          sx={{
            color: "#555",
            transition: "color 0.2s ease, transform 0.2s ease",
            "&:hover": { color: "#c5a882", transform: "scale(1.1)" },
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: isMobile ? 24 : 22 }} />
        </IconButton>
        <IconButton
          sx={{
            color: "#555",
            transition: "color 0.2s ease, transform 0.2s ease",
            "&:hover": { color: "#c0efbb", transform: "scale(1.1)" },
          }}
        >
          <LogoutIcon sx={{ fontSize: isMobile ? 24 : 22 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
