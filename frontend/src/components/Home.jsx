import { useState } from "react";
import AllLinksNavbar from "./AllLinksNavbar";
import HomeProductSection from "./HomeProductSection";
import ImageSlider from "./ImageSlider";
import Navbar from "./Navbar";
import ShopByCategory from "./ShopByCategory";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <AllLinksNavbar /> 
      <ImageSlider />
      <ShopByCategory /> 
      <HomeProductSection search={search} />
    </div>
  );
};

export default Home;
