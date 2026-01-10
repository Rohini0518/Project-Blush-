import { useState } from "react";
import { Box, Typography } from "@mui/material";
import CategoryCard from "../cards/CategoryCard";
import categorykurtha from "../assets/category-kurtha.jpeg";
import categoryPartWear from "../assets/category-semiparty.jpeg";
import categoryImg from "../assets/category-img.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ShopByCategory = () => {
  const categoryImages: { id: number; img: string }[] = [
    { id: 1, img: categorykurtha },
    { id: 2, img: categoryPartWear },
    { id: 3, img: categoryImg },
    { id: 4, img: categoryPartWear },
    { id: 5, img: categorykurtha },
    { id: 6, img: categoryImg },
    { id: 7, img: categoryImg },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_COUNT = 4;
  const visibleImages = categoryImages.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );
  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < categoryImages.length) {
      setStartIndex(startIndex + 1);
    }
  };
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h5">Shop By Category</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box
            onClick={handlePrev}
            sx={{
              backgroundColor: "#f8f3f3",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.3s ease, transform 0.3s ease",

              opacity: startIndex === 0 ? 0.4 : 1,
            }}
          >
            <ArrowBackIosNewIcon sx={{ cursor: "pointer" }} />
          </Box>
          {visibleImages.map((cat) => (
            <CategoryCard key={cat.id} img={cat.img} />
          ))}
          <Box
            onClick={handleNext}
            sx={{
              backgroundColor: "#f8f3f3",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              justifyContent: "center",
              transition: "opacity 0.3s ease, transform 0.3s ease",

              opacity:
                startIndex + VISIBLE_COUNT >= categoryImages.length ? 0.4 : 1,
            }}
          >
            <ArrowForwardIosIcon sx={{ cursor: "pointer" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShopByCategory;
