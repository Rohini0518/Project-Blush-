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
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const STATIC_REVIEWS = [
  {
    id: 1,
    name: "Ravi Kumar",
    avatar: "RK",
    rating: 5,
    date: "March 12, 2025",
    comment:
      "Excellent product! The quality is top-notch and delivery was super fast. Highly recommend to everyone.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "PS",
    rating: 4,
    date: "February 28, 2025",
    comment:
      "Really good product for the price. Packaging was secure and the item matched the description perfectly.",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    avatar: "AM",
    rating: 4,
    date: "January 15, 2025",
    comment:
      "Satisfied with the purchase. Build quality is solid. Would have given 5 stars if delivery was a bit quicker.",
  },
];

const ShopProductDetails = ({ productId, open, onClose }) => {
  const dispatch = useDispatch();
  const { productDetails, isLoading } = useSelector(
    (state) => state.shopProducts,
  );
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (productId && open) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId, open]);
  const stock = productDetails?.totalStock;

  const displayPrice = productDetails?.salePrice || productDetails?.price;
  const originalPrice = productDetails?.salePrice
    ? productDetails?.price
    : null;
  const discount = originalPrice
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : null;
    
  console.log("stock,displayPrice,originalprice,discount",stock,displayPrice,discount);
  const handleIncrease = () => {
    if (quantity < 10) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity >= 1) setQuantity((prev) => prev - 1);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}
      >
        <CloseIcon fontSize="small" />
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                <Typography
                  fontWeight={700}
                  fontSize="1.05rem"
                  lineHeight={1.3}
                >
                  {productDetails.title}
                </Typography>

                {3 !== undefined && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating value={3} precision={0.5} readOnly size="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.8rem" }}
                    >
                      {3} ·{" "}
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {productDetails.totalReviews || STATIC_REVIEWS.length}{" "}
                        reviews
                      </span>
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
                      stock > 5
                        ? "In Stock"
                        : stock > 0
                          ? ` Hurry Up only ${stock} available`
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
                      onClick={handleDecrease}
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
                      onClick={handleIncrease}
                      sx={{ borderRadius: 0 }}
                    >
                      <AddIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    disableElevation
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

            <Divider />
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography fontWeight={700} fontSize="0.95rem">
                  Customer Reviews
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Rating
                    value={productDetails.averageReview ?? 4}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="0.8rem"
                  >
                    {productDetails.averageReview?.toFixed(1) ?? "4.0"} out of 5
                    · {productDetails.totalReviews ?? STATIC_REVIEWS.length}{" "}
                    reviews
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxHeight: 220,
                  overflowY: "auto",
                  pr: 1,
                }}
              >
                {STATIC_REVIEWS.map((review, index) => (
                  <Box key={review.id}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Avatar */}
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          bgcolor:
                            index === 0
                              ? "primary.main"
                              : index === 1
                                ? "secondary.main"
                                : "success.main",
                        }}
                      >
                        {review.avatar}
                      </Avatar>

                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight={600} fontSize="0.85rem">
                            {review.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {review.date}
                          </Typography>
                        </Box>
                        <Rating
                          value={review.rating}
                          readOnly
                          size="small"
                          sx={{ my: 0.3 }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          lineHeight={1.6}
                        >
                          {review.comment}
                        </Typography>
                      </Box>
                    </Box>

                    {index < STATIC_REVIEWS.length - 1 && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShopProductDetails;
