import { Route, Routes } from "react-router-dom";
import { useTabTitleChange } from "./hooks/useTabTitleChange";
import Layout from "./components/auth/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminLayout from "./pages/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShopLayout from "./pages/shooping-view/ShopLayout";
import Home from "./components/Home";

function App() {
  useTabTitleChange(
    ["Come back 👀", "Miss you 💖", "Cart is waiting 🛒"],
    2000,
  );
  return (
    <div style={{ padding: "2px", margin: "2px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="/shop" element={<ShopLayout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
