import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  ListItemIcon,
  Typography,
  MenuItem,
  Divider,
  Menu,
  Avatar,
  Badge,
} from "@mui/material";
import blushLogo from "../../assets/blushlogo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/authSlice";
import { useToast } from "../../hooks/useToast";
import CartDialog from "../../store/shop/CartDialog";
import { fetchCartItems } from "../../store/shop/cartSlice";

export default function ShopHeader({ search = "", setSearch }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAvatarClick = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const { showToast } = useToast();

  const items = useSelector((state) => state.shoppingCart);

  const [cartOpen, setCartOpen] = useState(false);

  const totalQuantity = Array.isArray(items)
    ? (items || [])?.reduce((sum, item) => item.quantity + sum, 0)
    : 0;

  console.log(totalQuantity, "totalqunatity cart");
  const handleLogout = async () => {
    try {
      const logout = await dispatch(logoutUser()).unwrap();
      if (logout.success) showToast("logout success", "success");

      handleMenuClose();
    } catch (error) {
      showToast("product Operation Failed", "error");
    }
  };

  // useEffect(() => {
  //   const userId = user.id;
  //   const getqnty = dispatch(fetchCartItems(userId));
  //   if (getqnty.success) {
  //     console.log(getqnty, "complete cart");
  //     // const totalquntity = "";
  //   }
  // }, []);

  const handleAccount = () => {
    handleMenuClose();
    navigate("/shop/account");
  };
  console.log(user, user.userName);
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
          gap: 1,
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
          onClick={() => setCartOpen(true)}
          sx={{
            color: "#555",
            transition: "color 0.2s ease, transform 0.2s ease",
            "&:hover": { color: "#c0efbb", transform: "scale(1.1)" },
          }}
        >
          <Badge
            badgeContent={totalQuantity}
            color="secondary"
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "10px",
                height: 14,
                minWidth: 8,
              },
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: isMobile ? 26 : 24 }} />
          </Badge>
        </IconButton>
        {isAuthenticated && (
          <>
            <Avatar
              onClick={handleAvatarClick}
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#c5a882",
                fontSize: "0.9rem",
                cursor: "pointer",
                border: "2px solid #f0ece6",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  boxShadow: "0 0 0 3px #c0efbb",
                  transform: "scale(1.08)",
                },
              }}
            >
              {user?.userName?.slice(0, 2).toUpperCase()}
            </Avatar>

            <Menu
              anchorEl={menuAnchor}
              open={menuOpen}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1,
                  minWidth: 180,
                  borderRadius: "12px",
                  border: "1px solid #f0ece6",
                  overflow: "visible",
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: -6,
                    right: 14,
                    width: 12,
                    height: 12,
                    bgcolor: "background.paper",
                    border: "1px solid #f0ece6",
                    borderBottom: "none",
                    borderRight: "none",
                    transform: "rotate(45deg)",
                  },
                },
              }}
            >
              <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#aaa", fontWeight: 600, letterSpacing: 0.5 }}
                >
                  MY ACCOUNT
                </Typography>
              </Box>

              <MenuItem
                onClick={handleAccount}
                sx={{
                  gap: 1.5,
                  py: 1.2,
                  mx: 1,
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#faf6f1" },
                }}
              >
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <AccountCircleIcon sx={{ fontSize: 20, color: "#c5a882" }} />
                </ListItemIcon>
                <Typography sx={{ fontSize: "0.88rem", color: "#444" }}>
                  Account
                </Typography>
              </MenuItem>

              <Divider sx={{ my: 0.5, borderColor: "#f0ece6" }} />

              <MenuItem
                onClick={handleLogout}
                sx={{
                  gap: 1.5,
                  py: 1.2,
                  mx: 1,
                  mb: 0.5,
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#fff0f3" },
                }}
              >
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <LogoutIcon sx={{ fontSize: 20, color: "#e05c7a" }} />
                </ListItemIcon>
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    color: "#e05c7a",
                    fontWeight: 500,
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
      <CartDialog open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
}
