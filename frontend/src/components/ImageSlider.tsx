import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import jeansImg from "../assets/jean-tops.jpg";
import partWear from "../assets/partywear.jpg";
import semiPartyWear from "../assets/semi-partywear.jpg";
import kurthiSet from "../assets/kurtha-sets.jpg";

export default function ImageSlider() {
  const images: string[] = [kurthiSet, jeansImg, partWear, semiPartyWear];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: 400,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={images[currentImage]}
          alt="banner"
          sx={{
            width: "100%",
            height: "100%",
            transition: "opacity 0.6s ease-in-out",
          }}
        ></Box>
      </Box>
    </>
  );
}
