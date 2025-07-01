// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Auth guard
import PrivateRoute from './pages/PrivateRoute';

// Pages
import Home from './pages/Home';
import CreateOrderPage from './pages/CreateOrderPage';
import OrdersList from './pages/OrdersList';
import OrderPage from './pages/OrderPage';
import EditOrderPage from './pages/EditOrderPage';
import DealPage from './pages/DealPage';
import MyOrdersPage from './pages/MyOrdersPage';
import PaymentPage from './pages/PaymentPage';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Disputes from './pages/Disputes';
import AdminPanel from './pages/Admin';        // Admin.js
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LogoutButton from './pages/LogoutButton';
import NotFound from './pages/NotFound';

// Styles
import './App.css';

function App() {
  return (
    <Router>
      <Header />

      <main className="main-content">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutButton />} />

          {/* Protected */}
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
          <Route
            path="/wallet"
            element={
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/disputes"
            element={
              <PrivateRoute>
                <Disputes />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Redirect and 404 */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
