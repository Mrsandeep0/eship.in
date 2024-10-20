import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../src/Components/Navbar/Navbar";
import NavbarWrapper from "./Components/Navbar/NavbarWrapper";
import Store from "./Components/Store/Store";
import UserSignUp from "./Components/UserSignUp/UserSignUp";
import UserSignIn from "./Components/UserSingIn/UserSignIn";
import AdminDashBoard from "./Components/AdminDashBoard/AdminDashBoard";
import UserDashBoard from './Components/UserDashboard/UserDashboard';
import Product from "./Components/ProductDetalis/Product";
import Payments from "./Components/Payments/Payment";
import { Context } from "./Components/Context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import CartService from "./Components/Service/CartService";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    CartDetails();
  }, []);

  const [cartDetails, setCartDetails] = useState();
  const [cartItems, setCartItems] = useState([]);

  const CartDetails = () => {
    CartService.fetchCartDetails()
      .then((result) => {
        setCartCount(result.data.items.length);
        setCartDetails(result.data);
        setCartItems(result.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Create a custom component to handle Navbar conditional rendering
  const CustomNavbar = () => {
    const location = useLocation(); // Now useLocation is inside BrowserRouter
    return location.pathname === "/UserDashBoard" ? null : <Navbar />;
  };

  return (
    <Context.Provider value={{ cartCount, setCartCount, progress, setProgress, cartDetails, cartItems }}>
      <BrowserRouter>
        <CustomNavbar />  {/* Navbar conditionally rendered */}
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          <Route path="/UserSignIn" element={<UserSignIn />} />
          <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
          <Route path="/UserDashBoard" element={<UserDashBoard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
