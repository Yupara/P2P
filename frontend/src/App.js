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
import './App.css'; // общий стиль + тёмная тема

function App() {
  return (
    <Router>
      <div className="app dark-theme">
        <Header />

        <main className="main">
          <Routes>
            {/* Главная — обзор ордеров */}
            <Route path="/" element={<Home />} />

            {/* Создать новое объявление (buy/sell) */}
            <Route path="/create" element={<CreateOrder />} />

            {/* Список всех активных объявлений */}
            <Route path="/orders" element={<Orders />} />

            {/* Конкретная сделка + чат + эскроу */}
            <Route path="/trade/:tradeId" element={<Trade />} />

            {/* Профиль пользователя: баланс, кошельки, история */}
            <Route path="/profile" element={<Profile />} />

            {/* Админ-панель: споры, управление пользователями */}
            <Route path="/admin/*" element={<Admin />} />

            {/* Редирект Alias */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* Страница 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
