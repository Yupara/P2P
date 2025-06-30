// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OrderBookPage from './pages/OrderBookPage';
import CreateOrderPage from './pages/CreateOrderPage';
import TradePage from './pages/TradePage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import DisputesPage from './pages/DisputesPage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'; // стили тёмной темы и базовые правила

function App() {
  return (
    <Router>
      <div className="app dark-theme">
        <Header />

        <main className="content">
          <Routes>
            {/* Лента объявлений Buy/Sell */}
            <Route path="/" element={<OrderBookPage />} />

            {/* Создать объявление */}
            <Route path="/create" element={<CreateOrderPage />} />

            {/* Окно сделки (чат + эскроу) */}
            <Route path="/trade/:tradeId" element={<TradePage />} />

            {/* Кошелёк: баланс, пополнение/вывод */}
            <Route path="/wallet" element={<WalletPage />} />

            {/* Профиль пользователя */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* Разрешение споров */}
            <Route path="/disputes" element={<DisputesPage />} />

            {/* Админ-панель */}
            <Route path="/admin/*" element={<AdminPanelPage />} />

            {/* Псевдоним главной */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
