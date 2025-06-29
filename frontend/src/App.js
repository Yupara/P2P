// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateOrder from './pages/CreateOrder';
import Orders from './pages/Orders';
import Trade from './pages/Trade';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import './App.css'; // тёмная тема, базовые стили

function App() {
  return (
    <Router>
      <div className="app dark-theme">
        <Header />

        <main className="main-content">
          <Routes>
            {/* Главная страница с лентой объявлений */}
            <Route path="/" element={<Home />} />

            {/* Страница создания объявления (Buy / Sell) */}
            <Route path="/create" element={<CreateOrder />} />

            {/* Список всех активных объявлений */}
            <Route path="/orders" element={<Orders />} />

            {/* Конкретная сделка + чат + эскроу */}
            <Route path="/trade/:tradeId" element={<Trade />} />

            {/* Профиль пользователя */}
            <Route path="/profile" element={<Profile />} />

            {/* Админ-панель для модерации и споров */}
            <Route path="/admin/*" element={<Admin />} />

            {/* Псевдоним для главной */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* Любой несуществующий маршрут → 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
