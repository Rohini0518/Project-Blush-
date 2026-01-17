import AllLinksNavbar from "./components/AllLinksNavbar";
import HomeProductSection from "./components/HomeProductSection";
import ImageSlider from "./components/ImageSlider";
import Navbar from "./components/Navbar";
import ShopByCategory from "./components/ShopByCategory";
import { useTabTitleChange } from "./hooks/useTabTitleChange";

function App() {
  useTabTitleChange(
    ["Come back 👀", "Miss you 💖", "Cart is waiting 🛒"],
    2000
  );
  return (
    <div style={{ padding: "2px", margin: "2px" }}>
      <Navbar />
      <AllLinksNavbar />
      <ImageSlider />
      <ShopByCategory/>
      <HomeProductSection/>
    </div>
  );
}

export default App;
