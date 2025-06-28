import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 16, padding: 16, background: "#f8f8f8" }}>
      <Link to="/">🏠 Главная</Link>
      <Link to="/ads">Объявления</Link>
      <Link to="/create-ad">+ Новое объявление</Link>
      <Link to="/wallet">Кошелек</Link>
      <Link to="/profile">Профиль</Link>
      <Link to="/notifications">🔔</Link>
      <Link to="/admin">Админ</Link>
      <Link to="/auth">Вход/Регистрация</Link>
    </nav>
  );
}
