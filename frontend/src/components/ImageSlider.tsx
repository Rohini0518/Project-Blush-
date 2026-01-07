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
          height: { xs: 220, sm: 300, md: 450, lg: 500 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            transform: `translate3d(-${currentImage * 100}%,0,0)`,
            transition: "transform 600ms ease",
            willChange: "transform",
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              sx={{
                width: "100%",
                height: "100%",
                flexShrink: 0,
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
