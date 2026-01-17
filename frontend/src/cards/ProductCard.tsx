import { Box, Typography } from "@mui/material";

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
      <Box sx={{ display: "flex", width: "25rem", flexDirection: "column" }}>
        <Box component="img" src={img} sx={{ width: "90%", height: "30rem" }} />
        <Box>
          <Typography
            sx={{
              mt: 1,
              textAlign: "center",
              width: "100%",
              wordBreak: "break-word",
            }}
          >
            {productInfo}
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Rs.{price}
          </Typography>
        </Box>{" "}
      </Box>
    </>
  );
}
