import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CategoryCard from "../cards/CategoryCard";
import categorykurtha from "../assets/category-kurtha.jpeg";
import categoryPartWear from "../assets/category-semiparty.jpeg";
import categoryImg from "../assets/category-img.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import categoryTop from "../assets/top.png";
import partWear from "../assets/category-partywear.png";
import trendyWear from "../assets/partywear.jpg";
import logo from "../assets/blushlogo.jpg";

const categoryLabels: Record<number, string> = {
  1: "Kurthas",
  2: "Semi Party",
  3: "Tops",
  4: "Party Wear",
  5: "Trendy",
  6: "Collections",
  7: "Blush",
};

const ShopByCategory = () => {
  const categoryImages: { id: number; img: string }[] = [
    { id: 1, img: categorykurtha },
    { id: 2, img: categoryPartWear },
    { id: 3, img: categoryTop },
    { id: 4, img: partWear },
    { id: 5, img: trendyWear },
    { id: 6, img: categoryImg },
    { id: 7, img: logo },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_COUNT = 4;

  const visibleImages = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    return categoryImages[(startIndex + i) % categoryImages.length];
  });

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % categoryImages.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + categoryImages.length) % categoryImages.length
    );
  };

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            fontFamily: "'Georgia', serif",
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}
        >
          Shop By Category
        </Typography>
        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <Box sx={{ width: 36, height: "1px", background: "#ddd" }} />
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#c5a882",
            }}
          />
          <Box sx={{ width: 36, height: "1px", background: "#ddd" }} />
        </Box>
      </Box>

      {/* Carousel row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, md: 3 },
          width: "100%",
          maxWidth: "860px",
          justifyContent: "center",
        }}
      >
        {/* Prev */}
        <IconButton
          onClick={handlePrev}
          sx={{
            width: 38,
            height: 38,
            border: "1.5px solid #e8e0d8",
            background: "#fff",
            color: "#555",
            flexShrink: 0,
            transition: "all 0.22s ease",
            "&:hover": {
              background: "#1a1a1a",
              color: "#fff",
              borderColor: "#1a1a1a",
              transform: "scale(1.08)",
            },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
        </IconButton>

        {/* Cards */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, md: 4 },
            alignItems: "flex-start",
            overflow: "hidden",
          }}
        >
          {visibleImages.map((cat) => (
            <Box
              key={cat.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
              }}
            >
              <CategoryCard img={cat.img} />
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "#555",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {categoryLabels[cat.id] ?? "Category"}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Next */}
        <IconButton
          onClick={handleNext}
          sx={{
            width: 38,
            height: 38,
            border: "1.5px solid #e8e0d8",
            background: "#fff",
            color: "#555",
            flexShrink: 0,
            transition: "all 0.22s ease",
            "&:hover": {
              background: "#1a1a1a",
              color: "#fff",
              borderColor: "#1a1a1a",
              transform: "scale(1.08)",
            },
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>

      {/* Dot indicators */}
      <Box sx={{ display: "flex", gap: 0.8 }}>
        {categoryImages.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: i === startIndex ? 18 : 6,
              height: 6,
              borderRadius: "4px",
              background: i === startIndex ? "#c5a882" : "#ddd",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => setStartIndex(i)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ShopByCategory;