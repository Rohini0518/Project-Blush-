import { Box, Button, Typography } from "@mui/material";

interface ProductCardProps {
  img: string;
  price: number;
  productInfo: string;
}

export default function ProductCard({
  img,
  price,
  productInfo,
}: ProductCardProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "17rem",
          flexDirection: "column",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
          transition: "transform 0.28s ease, box-shadow 0.28s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
            "& .product-img": {
              transform: "scale(1.05)",
            },
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: "100%",
            height: "14rem",
            overflow: "hidden",
            background: "#f7f7f5",
          }}
        >
          <Box
            component="img"
            src={img}
            className="product-img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </Box>

        {/* Info */}
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
              fontSize: "0.82rem",
              color: "#555",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {productInfo}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Georgia', serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#1a1a1a",
            }}
          >
            Rs.{price.toLocaleString()}
          </Typography>

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
              "&:hover": {
                background: "#1a1a1a",
                color: "#fff",
              },
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
    </>
  );
}