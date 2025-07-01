// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Контексты
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Общие компоненты
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';

// Страницы
import OrderBook from './pages/OrderBook';           // лента ордеров
import CreateOrder from './pages/CreateOrder';       // форма создания ордера
import Trade from './pages/Trade';                   // окно сделки + чат + эскроу
import Wallet from './pages/Wallet';                 // пополнение/вывод и баланс
import Profile from './pages/Profile';               // профиль, KYC, история
import Disputes from './pages/Disputes';             // управление спорами
import AdminPanel from './pages/AdminPanel';         // админ-панель (только для тебя)
import Login from './pages/Login';                   // вход
import Register from './pages/Register';             // регистрация
import NotFound from './pages/NotFound';             // 404

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Header />

          <ErrorBoundary>
            <React.Suspense fallback={<Loader />}>
              <Routes>
                {/* Главная — лента buy/sell */}
                <Route path="/" element={<OrderBook />} />

                {/* Регистрация и вход */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Только для авторизованных */}
                <Route element={<Navigate to="/login" replace />} path="/create" />
                <Route path="/create" element={<CreateOrder />} />
                <Route path="/trade/:id" element={<Trade />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/disputes" element={<Disputes />} />

                {/* Админ-панель (доступно только тебе) */}
                <Route path="/admin/*" element={<AdminPanel />} />

                {/* Редирект alias */}
                <Route path="/home" element={<Navigate to="/" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </ErrorBoundary>

          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
