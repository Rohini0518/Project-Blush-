import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import ProductFilter from "./ProductFilter";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { sortOptions } from "../../config/formConfig";

const ShoppingListing = () => {
  const [selectedSort, setSelectedSort] = useState(null);
  const [sortAnchor, setSortAnchor] = useState(null);

  const handleSortOpen = (e) => setSortAnchor(e.currentTarget);
  const handleSortClose = () => setSortAnchor(null);
  const handleSortSelect = (id) => {
    setSelectedSort(id);
    handleSortClose();
  };
    const totalProducts = 10;

  return (
    <Box sx={{ display: "flex", gap: 0, minHeight: "100vh", bgcolor: "#fff" }}>
      <Box
        sx={{
          width: 260,
          flexShrink: 0,
          borderRight: "1px solid",
          borderColor: "divider",
          px: 3,
          pt: 3,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <ProductFilter />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ letterSpacing: "-0.3px" }}
          >
            All Products
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {totalProducts} Products
            </Typography>

            <Button
              variant="outlined"
              size="small"
              startIcon={<SwapVertIcon fontSize="small" />}
               onClick={handleSortOpen}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderColor: "divider",
                color: "text.primary",
                borderRadius: 1.5,
                px: 1.8,
                "&:hover": {
                  borderColor: "text.primary",
                  bgcolor: "transparent",
                },
              }}
            >
              Sort by
            </Button>

            <Menu
              anchorEl={sortAnchor}
              open={Boolean(sortAnchor)}
              // onClose={handleSortClose}
              PaperProps={{
                elevation: 2,
                sx: { mt: 1, minWidth: 200, borderRadius: 2 },
              }}
            >
              {sortOptions.map((opt) => (
                <MenuItem
                  key={opt.id}
                  selected={selectedSort === opt.id}
                  onClick={() => handleSortSelect(opt.id)}
                  sx={{
                    fontSize: "0.875rem",
                    py: 1,
                    "&.Mui-selected": {
                      bgcolor: "transparent",
                      fontWeight: 600,
                    },
                    "&.Mui-selected:hover": { bgcolor: "action.hover" },
                  }}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
            alignContent: "start",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default ShoppingListing;
