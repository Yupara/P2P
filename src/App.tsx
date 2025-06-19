import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersList from "./OrdersList";
import OrderPage from "./OrderPage";
import PaymentPage from "./PaymentPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyOrdersPage from "./MyOrdersPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrdersList />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/pay/:orderId" element={<PaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
      </Routes>
    </Router>
  );
}
import CreateOrderPage from "./CreateOrderPage";
// ...
<Route path="/create-order" element={<CreateOrderPage />} />
