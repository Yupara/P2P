// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout & UI
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import PrivateRoute from './components/PrivateRoute';

// Public pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';

// Orders & Trades
import OrdersList from './pages/OrdersList';
import OrderPage from './pages/OrderPage';
import OrderBookPage from './pages/OrderBookPage';
import CreateOrderPage from './pages/CreateOrderPage';
import EditOrderPage from './pages/EditOrderPage';
import MyOrdersPage from './pages/MyOrdersPage';
import Trade from './pages/Trade';
import PaymentPage from './pages/PaymentPage';
import Disputes from './pages/Disputes';

// User & Admin
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <Toast />

        <div className="app-container">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Orders */}
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
              path="/book"
              element={
                <PrivateRoute>
                  <OrderBookPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-order"
              element={
                <PrivateRoute>
                  <CreateOrderPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-order/:id"
              element={
                <PrivateRoute>
                  <EditOrderPage />
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

            {/* Trade & Payment */}
            <Route
              path="/trade/:id"
              element={
                <PrivateRoute>
                  <Trade />
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
              path="/disputes"
              element={
                <PrivateRoute>
                  <Disputes />
                </PrivateRoute>
              }
            />

            {/* User & Admin */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
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
              path="/admin"
              element={
                <PrivateRoute requireAdmin>
                  <Admin />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
