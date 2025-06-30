import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import Trade from "./pages/Trade";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

// Пример фейковых данных для пользователя и ордеров
const fakeUser = {
  name: "Юзер",
  avatar: "/avatar.svg",
  rating: 4.8,
  kycStatus: true,
  balances: [
    { currency: "USDT", amount: 150 },
    { currency: "BTC", amount: 0.3 },
    { currency: "RUB", amount: 50000 },
  ],
  trades: [
    { id: 1, amount: 100, currency: "USDT", status: "Released" },
    { id: 2, amount: 0.1, currency: "BTC", status: "Pending" },
  ],
};

const fakeOrders = [
  {
    id: 1,
    sellerNameMasked: "andr***",
    price: "90,000",
    rate: "1 USDT = 90.00 RUB",
    min: 1000,
    max: 50000,
    paymentMethod: "Банковская карта",
    country: "RU",
    type: "buy",
  },
  // Добавь ещё фейковые ордера по желанию...
];

const fakeWallets = [
  { currency: "USDT", balance: 150 },
  { currency: "BTC", balance: 0.3 },
  { currency: "RUB", balance: 50000 },
];

function App() {
  // Пример состояния авторизации
  const [isAuth, setIsAuth] = useState(true);

  return (
    <Router>
      <Header
        isAuth={isAuth}
        user={fakeUser}
        onLogin={() => setIsAuth(true)}
        onRegister={() => {}}
        onLogout={() => setIsAuth(false)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders orders={fakeOrders} />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/trades" element={<div>Мои сделки (заглушка)</div>} />
        <Route path="/wallet" element={<Wallet wallets={fakeWallets} />} />
        <Route path="/profile" element={<Profile user={fakeUser} />} />
        <Route path="/admin" element={<Admin users={[]} trades={[]} disputes={[]} />} />
        <Route path="/trade/:id" element={<Trade trade={{
          buyer: "andr***",
          seller: "yupar***",
          amount: 1500,
          rate: "1 USDT = 90.00 RUB",
          status: "Pending",
          timer: "14:59",
          messages: [
            { from: "buyer", text: "Здравствуйте!", time: "18:00" },
            { from: "seller", text: "Готовы к обмену?", time: "18:01" }
          ]
        }} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
