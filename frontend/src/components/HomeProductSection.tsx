import { Box, Typography } from "@mui/material";
import ProductCard from "../cards/ProductCard";
import { useEffect, useState } from "react";

type product = {
  image: string;
  id: number;
  price: number;
  title: string;
};
export default function HomeProductSection() {
  const [data, setData] = useState<product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapiserver.reactbd.org/api/products?page=1&perPage=10",
        );
        const datajson = await response.json();
        setData(datajson.data);
        console.log(datajson);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Fashion Wear</Typography>
          <Typography variant="h4">sectionSubtitle</Typography>
          <Typography sx={{ color: "red" }}>(❁´◡`❁)</Typography>
        </Box>

        <Box
          sx={{
            m: "10px",
            width: "90%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {data.map((product) => (
            <ProductCard
              key={product.id}
              img={product.image}
              productInfo={product.title}
              price={product.price}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
