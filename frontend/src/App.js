// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainPage from './pages/MainPage';
import CreateOrderPage from './pages/CreateOrderPage';
import OrdersList from './pages/OrdersList';
import OrderPage from './pages/OrderPage';
import EditOrderPage from './pages/EditOrderPage';
import DealPage from './pages/DealPage';
import MyOrdersPage from './pages/MyOrdersPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutButton from './pages/LogoutButton';
import PrivateRoute from './pages/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app dark-theme">
        <Routes>
          {/* Главная — лента объявлений */}
          <Route path="/" element={<MainPage />} />

          {/* Публичные маршруты */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutButton />} />

          {/* Защищённые маршруты */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateOrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrdersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/:id/edit"
            element={
              <PrivateRoute>
                <EditOrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/trade/:id"
            element={
              <PrivateRoute>
                <DealPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <PrivateRoute>
                <MyOrdersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            }
          />

          {/* Всe прочие — на главную */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
