import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminProductCard = ({ product, onEdit, onDelete }) => {
  const { image, title, price, salePrice, totalStock } = product;

  const isOutOfStock = totalStock === 0;
  const isLowStock = totalStock > 0 && totalStock <= 10;

  const stockLabel = isOutOfStock
    ? "Out of Stock"
    : isLowStock
    ? `Low Stock: ${totalStock}`
    : `In Stock: ${totalStock}`;

  const stockColor = isOutOfStock ? "error" : isLowStock ? "warning" : "success";

  const discount =
    salePrice && salePrice < price
      ? Math.round(((price - salePrice) / price) * 100)
      : null;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.14)" },
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative", width: 320, height: 340, flexShrink: 0 }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Chip
          label={stockLabel}
          color={stockColor}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.4,
            mb: 1.5,
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 75 }}>
              Price:
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color="text.primary"
              sx={{ textDecoration: salePrice && salePrice < price ? "line-through" : "none" }}
            >
              ₹{price}
            </Typography>
          </Box>

          {salePrice && salePrice < price && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 75 }}>
                Sale Price:
              </Typography>
              <Typography variant="body2" fontWeight={700} color="success.main">
                ₹{salePrice}
              </Typography>
              {discount && (
                <Chip
                  label={`${discount}% off`}
                  color="success"
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 600, fontSize: "0.68rem", height: 20 }}
                />
              )}
            </Box>
          )}
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ px: 2, py: 1.5, gap: 1 }}>
        <Button
          fullWidth
    variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEdit?.(product)}
          sx={{
            backgroundColor: "success.main",
            "&:hover": { backgroundColor: "success.dark" },
          }}
        >
          Edit
        </Button>
        <Button
          fullWidth
    variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete?.(product)}
          sx={{
            backgroundColor: "error.main",
            "&:hover": { backgroundColor: "error.dark" },
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminProductCard;