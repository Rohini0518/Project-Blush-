import { Route, Routes } from "react-router-dom";
import { useTabTitleChange } from "./hooks/useTabTitleChange";
import Layout from "./components/auth/Layout";
import Login from "./components/auth/AuthLogin";
import Register from "./components/auth/AuthRegister";
import AdminLayout from "./pages/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/AdminDashboard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import ShopLayout from "./pages/shooping-view/ShopLayout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ShopingDashboard from "./pages/shooping-view/ShopDashboard";
import ShopCheckout from "./pages/shooping-view/ShopCheckout";
import ShopAccount from "./pages/shooping-view/ShopAccount";
import ShopingHeader from "./pages/shooping-view/ShopHeader";
import CheckAuth from "./components/common/CheckAuth";
import UnAuthPage from "./pages/unAuthPage/UnAuthPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";
import { useEffect } from "react";
import AdminOrders from "./pages/admin-view/AdminOrders";
import ShoppingListing from "./pages/shooping-view/ShopListing";

function App() {
  
  useTabTitleChange(
    ["Come back 👀", "Miss you 💖", "Cart is waiting 🛒"],
    2000,
  );

  
const{isAuthenticated,user, isLoading}=useSelector(state=>(state.auth))
const dispatch=useDispatch();

useEffect(()=>{
  dispatch(checkAuth())
},[dispatch])

if(isLoading) return <div>Loading....</div>

  return (
    <div style={{ padding: "2px", margin: "2px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders/>} />

        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<ShopingDashboard />} />
          <Route path="header" element={<ShopingHeader />} />
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="account" element={<ShopAccount />} />
                    <Route path="listing" element={<ShoppingListing />} />

        </Route>
        <Route path="unauth-page" element={<UnAuthPage/>}/>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
