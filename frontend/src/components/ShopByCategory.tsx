import { useState } from "react";
import { Box, Typography } from "@mui/material";
import CategoryCard from "../cards/CategoryCard";
import categorykurtha from "../assets/category-kurtha.jpeg";
import categoryPartWear from "../assets/category-semiparty.jpeg";
import categoryImg from "../assets/category-img.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import categoryTop from "../assets/top.png";
import partWear from "../assets/category-partywear.png";
import trendyWear from "../assets/partywear.jpg";
import logo from "../assets/blushlogo.jpg"

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
  setStartIndex((prev) =>
    (prev - 1 + categoryImages.length) % categoryImages.length
  );
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
