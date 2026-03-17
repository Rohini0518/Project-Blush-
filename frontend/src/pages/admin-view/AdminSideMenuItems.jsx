import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <InventoryIcon />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCartIcon />,
  },
];

const AdminSideMenuItems = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        p: 2,
      }}
    >
      <List>
        {adminSideBarMenuItems.map((menuItem) => (
          <ListItem
            key={menuItem.id}
            disablePadding
            sx={{
              mb: 1,
              borderRadius: "10px",
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <ListItemButton
              onClick={() => navigate(menuItem.path)}
              sx={{
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#a5e69e",
                  borderRight: "1px solid #e0e0e0",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#333" }}>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminSideMenuItems;
