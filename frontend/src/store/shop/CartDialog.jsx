import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Slide,
} from "@mui/material";
import { forwardRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "./cartSlice";

const SlideTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function QtyButton({ onClick, children, disabled }) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      size="small"
      sx={{
        width: 28,
        height: 28,
        border: "1.5px solid #e8e0d8",
        borderRadius: "8px",
        color: "#777",
        backgroundColor: "#faf9f7",
        transition: "all 0.18s ease",
        "&:hover:not(:disabled)": {
          borderColor: "#c5a882",
          backgroundColor: "#f5efe6",
          color: "#c5a882",
        },
        "&:disabled": { opacity: 0.35 },
      }}
    >
      {children}
    </IconButton>
  );
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const discount = item.price
    ? Math.round(((item.price - item.salePrice) / item.price) * 100)
    : null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        py: 2.2,
        px: 0.5,
        position: "relative",
        "&:not(:last-child)": {
          borderBottom: "1px solid #f5f0ea",
        },
        transition: "background 0.2s",
        borderRadius: "12px",
        "&:hover": { backgroundColor: "#fdfbf8" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{
            width: 82,
            height: 82,
            borderRadius: "12px",
            objectFit: "cover",
            border: "1.5px solid #f0ece6",
            boxShadow: "0 3px 12px rgba(197,168,130,0.18)",
          }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#333",
            lineHeight: 1.25,
            mb: 0.4,
            fontFamily: "'Georgia', serif",
          }}
        >
          {item.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#333" }}
          >
            ₹{(item.salePrice * item.quantity).toLocaleString("en-IN")}
          </Typography>
          {item.price && (
            <>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: "#bbb",
                  textDecoration: "line-through",
                }}
              >
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#2e7d32",
                  backgroundColor: "#e8f5e9",
                  px: 0.7,
                  py: 0.15,
                  borderRadius: "5px",
                }}
              >
                {discount}% OFF
              </Typography>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <QtyButton onClick={onDecrease} disabled={item.quantity <= 1}>
            <RemoveIcon sx={{ fontSize: 14 }} />
          </QtyButton>
          <Typography
            sx={{
              minWidth: 24,
              textAlign: "center",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "#444",
            }}
          >
            {item.quantity}
          </Typography>
          <QtyButton onClick={onIncrease}>
            <AddIcon sx={{ fontSize: 14 }} />
          </QtyButton>
        </Box>
      </Box>

      <IconButton
        onClick={onRemove}
        size="small"
        sx={{
          position: "absolute",
          top: 10,
          right: 0,
          color: "#ccc",
          transition: "color 0.2s, transform 0.2s",
          "&:hover": { color: "#e05c7a", transform: "scale(1.15)" },
        }}
      >
        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}

export default function CartDialog({ open, onClose }) {
  // const items = MOCK_CART;
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.shoppingCart.cartItems);
  const subtotal = cartItems.reduce((s, i) => s + i.salePrice * i.quantity, 0);
  const savings = cartItems?.reduce(
    (s, i) => s + (i.price ? (i.price - i.salePrice) * i.quantity : 0),
    0,
  );

  const delivery = subtotal >= 999 ? 0 : 99;
  const total = subtotal + delivery;
  const itemCount = cartItems?.reduce((s, i) => s + i.quantity, 0) || 0;
  const dispatch = useDispatch();

  const handleQuantityIncrease  = async (productId, quantity) => {
    const userId = user.id;
    if (!userId) return;
    await dispatch(
      updateCartItem({ userId, productId, quantity: quantity + 1 }),
    );
  };

  const handleQuantityDecrease = async (productId, quantity) => {
    const userId = user.id;
    if (!userId) return;
    if (quantity == 1) {
      await dispatch(deleteCartItem({ userId, productId }));
    } else {
      await dispatch(
        updateCartItem({ userId, productId, quantity: quantity - 1 }),
      );
    }
  };

  const handleDelete = async (productId) => {
    const userId = user.id;
    if (!userId) return;
    await dispatch(deleteCartItem({ userId, productId }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      keepMounted
      fullWidth
      PaperProps={{
        sx: {
          position: "fixed",
          right: 0,
          top: 0,
          m: 0,
          height: "100vh",
          maxHeight: "100vh",
          width: { xs: "100vw", sm: "440px" },
          maxWidth: "100%",
          borderRadius: { xs: 0, sm: "20px 0 0 20px" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#fdfcfb",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          justifyContent: "flex-end",
          alignItems: "stretch",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(50,35,20,0.35)",
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0ece6",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ShoppingBagOutlinedIcon sx={{ color: "#c5a882", fontSize: 22 }} />
          <Typography
            sx={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "#2a1f14",
              letterSpacing: 0.3,
            }}
          >
            Your Bag
          </Typography>
          {itemCount > 0 && (
            <Box
              sx={{
                backgroundColor: "#c5a882",
                color: "#fff",
                borderRadius: "20px",
                px: 1,
                py: 0.1,
                fontSize: "0.72rem",
                fontWeight: 700,
                minWidth: 22,
                textAlign: "center",
              }}
            >
              {itemCount}
            </Box>
          )}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#999",
            border: "1.5px solid #f0ece6",
            borderRadius: "10px",
            width: 34,
            height: 34,
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "#e05c7a",
              color: "#e05c7a",
              backgroundColor: "#fff0f3",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {delivery > 0 && (
        <Box
          sx={{
            px: 3,
            py: 1.2,
            backgroundColor: "#fff9f0",
            borderBottom: "1px solid #f5ede0",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocalOfferOutlinedIcon sx={{ fontSize: 15, color: "#c5a882" }} />
          <Typography sx={{ fontSize: "0.78rem", color: "#a07850" }}>
            Add <b>₹{(999 - subtotal).toLocaleString("en-IN")}</b> more for{" "}
            <b>FREE delivery</b>
          </Typography>
        </Box>
      )}
      {delivery === 0 && (
        <Box
          sx={{
            px: 3,
            py: 1.2,
            backgroundColor: "#f0faf1",
            borderBottom: "1px solid #d8f0da",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocalOfferOutlinedIcon sx={{ fontSize: 15, color: "#2e7d32" }} />
          <Typography
            sx={{ fontSize: "0.78rem", color: "#2e7d32", fontWeight: 600 }}
          >
            🎉 You've unlocked FREE delivery!
          </Typography>
        </Box>
      )}

      <DialogContent
        sx={{
          px: 2.5,
          py: 1,
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#e8e0d8",
            borderRadius: 4,
          },
        }}
      >
        {(cartItems || [])?.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
              pb: 4,
            }}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: "#e8e0d8" }} />
            <Typography
              sx={{
                color: "#bbb",
                fontFamily: "'Georgia', serif",
                fontSize: "1.05rem",
              }}
            >
              Your bag is empty
            </Typography>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                borderColor: "#c5a882",
                color: "#c5a882",
                borderRadius: "24px",
                px: 3,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#f5efe6",
                  borderColor: "#c5a882",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          cartItems &&
          cartItems.length > 0 &&
          cartItems.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onIncrease={() =>
                handleQuantityIncrease (item.productId, item.quantity)
              }
              onDecrease={() => handleQuantityDecrease(item.productId, item.quantity)}
              onRemove={() => handleDelete(item.productId)}
            />
          ))
        )}
      </DialogContent>

      {(cartItems || [])?.length > 0 && (
        <Box
          sx={{
            flexShrink: 0,
            borderTop: "1px solid #f0ece6",
            backgroundColor: "#fff",
            px: 3,
            pt: 2,
            pb: 3,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 0.9, mb: 1.8 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.82rem", color: "#999" }}>
                Subtotal ({itemCount} item{itemCount > 1 ? "s" : ""})
              </Typography>
              <Typography
                sx={{ fontSize: "0.82rem", color: "#555", fontWeight: 600 }}
              >
                ₹{subtotal.toLocaleString("en-IN")}
              </Typography>
            </Box>

            {savings > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "0.82rem", color: "#2e7d32" }}>
                  You save
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                >
                  − ₹{savings.toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.82rem", color: "#999" }}>
                Delivery
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: delivery === 0 ? "#2e7d32" : "#555",
                }}
              >
                {delivery === 0 ? "FREE" : `₹${delivery}`}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#f0ece6", mb: 1.8 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2.2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Georgia', serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#2a1f14",
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Georgia', serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#2a1f14",
              }}
            >
              ₹{total.toLocaleString("en-IN")}
            </Typography>
          </Box>

          <Button
            fullWidth
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#2a1f14",
              color: "#f5ede0",
              borderRadius: "14px",
              py: 1.5,
              fontSize: "0.9rem",
              fontWeight: 700,
              textTransform: "none",
              letterSpacing: 0.5,
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "#c5a882",
                color: "#fff",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 20px rgba(197,168,130,0.45)",
              },
              "&:active": { transform: "translateY(0)" },
            }}
          >
            Proceed to Checkout
          </Button>

          <Typography
            sx={{
              textAlign: "center",
              fontSize: "0.72rem",
              color: "#bbb",
              mt: 1.2,
              letterSpacing: 0.3,
            }}
          >
            Secure checkout · Easy returns · COD available
          </Typography>
        </Box>
      )}
    </Dialog>
  );
}
