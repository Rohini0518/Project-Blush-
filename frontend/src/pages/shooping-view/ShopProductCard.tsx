import { useState } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";

interface Product {
  _id: string;
  image: string;
  title: string;
  price: number;
  salePrice: number;
  sizes?: string[];
}
interface ProductCardProps {
  product: Product;
}

const DEFAULT_SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ShopProductCard({ product }: ProductCardProps) {
  const { image, title, price, salePrice, sizes } = product;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const availableSizes = sizes && sizes.length > 0 ? sizes : DEFAULT_SIZES;
  const hasSale = salePrice && salePrice < price;
  const discountPct = hasSale
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
          "& .product-img": { transform: "scale(1.05)" },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "14rem",
          overflow: "hidden",
          background: "#f7f7f5",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          className="product-img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {hasSale && (
          <Chip
            label={`-${discountPct}%`}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "#1a1a1a",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 22,
              borderRadius: "6px",
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          px: 2,
          pt: 1.5,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.2rem",
            fontWeight:"bold",
            color: "#000",
            lineHeight: 1.5,
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
          <Typography
            sx={{
              fontFamily: "'Georgia', serif",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#1a1a1a",
            }}
          >
            Rs.{(hasSale ? salePrice : price).toLocaleString()}
          </Typography>

          {hasSale && (
            <Typography
              sx={{
                fontFamily: "'Georgia', serif",
                fontSize: "0.82rem",
                color: "#999",
                textDecoration: "line-through",
              }}
            >
              Rs.{price.toLocaleString()}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontFamily: "'Georgia', serif",
              fontSize: "0.7rem",
              color: "#000",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 0.6,
            }}
          >
            Size
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {availableSizes.map((size) => (
              <Box
                key={size}
                onClick={() =>
                  setSelectedSize(selectedSize === size ? null : size)
                }
                sx={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  border: "1.5px solid",
                  borderColor: selectedSize === size ? "#1a1a1a" : "#ddd",
                  bgcolor: selectedSize === size ? "#1a1a1a" : "transparent",
                  color: selectedSize === size ? "#fff" : "#555",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  userSelect: "none",
                  "&:hover": {
                    borderColor: "#1a1a1a",
                    color: selectedSize === size ? "#fff" : "#1a1a1a",
                  },
                }}
              >
                {size}
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          sx={{
            mt: 1,
            width: "100%",
            py: 0.8,
            fontFamily: "'Georgia', serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            background: "transparent",
            border: "1.5px solid #1a1a1a",
            borderRadius: "6px",
            minHeight: "unset",
            transition: "all 0.22s ease",
            "&:hover": { background: "#1a1a1a", color: "#fff" },
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
}