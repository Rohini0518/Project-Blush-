import { Box, Typography, CircularProgress } from "@mui/material";
import ProductCard from "../cards/ProductCard";
import { useEffect, useState } from "react";

type product = {
  image: string;
  id: number;
  price: number;
  title: string;
};

type propsType = {
  search: string;
};

export default function HomeProductSection({ search }: propsType) {
  const [data, setData] = useState<product[]>([]);
  const [errorMsz, setErrorMsz] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapiserver.reactbd.org/api/products?page=1&perPage=10"
        );
        const datajson = await response.json();
        const productsData = datajson.data;
        setData(productsData);
      } catch (err) {
        console.error("Error:", err);
        setErrorMsz(err.message);
      }
    };

    fetchData();
  }, []);

  const filteredSearchProducts = data.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
          px: 3,
          pb: 8,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 6,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Fashion Wear
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Georgia', serif",
              fontWeight: 400,
              fontSize: { xs: "1rem", md: "1.15rem" },
              color: "#888",
              mt: 1,
              letterSpacing: "0.04em",
            }}
          >
            sectionSubtitle
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mt: 2.5,
            }}
          >
            <Box sx={{ width: 40, height: "1px", background: "#ddd" }} />
            <Typography sx={{ color: "#c5a882", fontSize: "1rem" }}>
              (❁´◡`❁)
            </Typography>
            <Box sx={{ width: 40, height: "1px", background: "#ddd" }} />
          </Box>
        </Box>

        {errorMsz && (
          <Typography
            sx={{
              color: "#c0392b",
              background: "#fdf0ef",
              border: "1px solid #f5c6c2",
              borderRadius: "8px",
              px: 3,
              py: 1.5,
              fontSize: "0.85rem",
              mb: 4,
            }}
          >
            Something went wrong: {errorMsz}
          </Typography>
        )}

        {!filteredSearchProducts.length && !errorMsz && data.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 8,
              color: "#aaa",
            }}
          >
            <CircularProgress size={32} sx={{ color: "#c5a882" }} />
            <Typography sx={{ fontFamily: "'Georgia', serif", fontSize: "0.9rem" }}>
              Loading products...
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: "28px",
            justifyItems: "center",
          }}
        >
          {filteredSearchProducts.map((product) => (
            <ProductCard
              key={product.id}
              img={product.image}
              productInfo={product.title}
              price={product.price}
            />
          ))}
        </Box>

        {filteredSearchProducts.length === 0 && data.length > 0 && (
          <Box
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              color: "#aaa",
            }}
          >
            <Typography
              sx={{ fontFamily: "'Georgia', serif", fontSize: "1.2rem", color: "#666" }}
            >
              No products found
            </Typography>
            <Typography sx={{ fontSize: "0.82rem", color: "#aaa" }}>
              Try a different search term
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}