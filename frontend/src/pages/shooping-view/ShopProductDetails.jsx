import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../store/shop/shopProductsSlice";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Divider,
  Rating,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ShopProductDetails = ({ productId, open, onClose }) => {
  const dispatch = useDispatch();
  const { productDetails, isLoading } = useSelector(
    (state) => state.shopProducts,
  );
  console.log(productDetails, isLoading, "productDetails,islaoding");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (productId && open) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId, open]);

  const displayPrice = productDetails?.salePrice || productDetails?.price;
  const originalPrice = productDetails?.salePrice
    ? productDetails?.price
    : null;
  const discount = originalPrice
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}
      >
        {/* <CloseIcon fontSize="small" /> */}@
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {isLoading ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">Loading...</Typography>
          </Box>
        ) : !productDetails ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">No product found.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", height: 380 }}>
            <Box
              sx={{
                width: 280,
                flexShrink: 0,
                bgcolor: "#fafafa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid",
                borderColor: "divider",
                p: 3,
              }}
            >
              <Box
                component="img"
                src={productDetails.image || productDetails.images?.[0]}
                alt={productDetails.title}
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                overflowY: "auto",
              }}
            >
              <Typography fontWeight={700} fontSize="1.05rem" lineHeight={1.3}>
                {productDetails.title}
              </Typography>

              {productDetails.averageReview !== undefined && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating
                    value={productDetails.averageReview}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({productDetails.totalReviews || 0})
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography fontWeight={700} fontSize="1.2rem">
                  ₹{displayPrice?.toLocaleString("en-IN")}
                </Typography>
                {originalPrice && (
                  <Typography
                    variant="body2"
                    color="text.disabled"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ₹{originalPrice?.toLocaleString("en-IN")}
                  </Typography>
                )}
                {discount && (
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="success.main"
                  >
                    {discount}% off
                  </Typography>
                )}
              </Box>

              <Divider />

              <Typography
                variant="body2"
                color="text.secondary"
                lineHeight={1.7}
              >
                {productDetails.description}
              </Typography>

              {[
                { label: "Brand", value: productDetails.brand },
                { label: "Category", value: productDetails.category },
                {
                  label: "Stock",
                  value:
                    productDetails.totalStock > 0
                      ? `${productDetails.totalStock} available`
                      : "Out of Stock",
                },
              ]
                .filter((r) => r.value)
                .map((row) => (
                  <Box key={row.label} sx={{ display: "flex", gap: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ minWidth: 70, color: "text.secondary" }}
                    >
                      {row.label}
                    </Typography>
                    <Typography variant="body2">{row.value}</Typography>
                  </Box>
                ))}

              <Box
                sx={{
                  mt: "auto",
                  pt: 1,
                  display: "flex",
                  gap: 1.5,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1.5,
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    sx={{ borderRadius: 0 }}
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <Typography
                    sx={{
                      px: 1.5,
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      borderLeft: "1px solid",
                      borderRight: "1px solid",
                      borderColor: "divider",
                      userSelect: "none",
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setQuantity((q) => q + 1)}
                    sx={{ borderRadius: 0 }}
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  disableElevation
                  fullWidth
                  disabled={productDetails.totalStock === 0}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    bgcolor: "text.primary",
                    color: "#fff",
                    "&:hover": { bgcolor: "text.secondary" },
                  }}
                >
                  {productDetails.totalStock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShopProductDetails;
