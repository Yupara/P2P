// src/components/Header.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css'; // добавьте стили по желанию

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header dark-theme">
      <div className="logo" onClick={() => navigate('/')}>
        P2P Exchange
      </div>
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Объявления
        </NavLink>
        <NavLink to="/trades" className={({ isActive }) => isActive ? 'active' : ''}>
          Мои сделки
        </NavLink>
        <NavLink to="/wallet" className={({ isActive }) => isActive ? 'active' : ''}>
          Кошелёк
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
          Профиль
        </NavLink>
      </nav>
      <button
        className="btn-create-order"
        onClick={() => navigate('/create')}
      >
        + Создать объявление
      </button>
    </header>
  );
}
