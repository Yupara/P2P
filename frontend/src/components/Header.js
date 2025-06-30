import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuth, user, onLogin, onRegister, onLogout }) => (
  <header className="header">
    <div className="header__left">
      <img src="/logo.svg" alt="Логотип" className="header__logo" />
    </div>
    <nav className="header__nav">
      <Link to="/">Главная</Link>
      <Link to="/orders">Купить/Продать</Link>
      <Link to="/trades">Мои сделки</Link>
      <Link to="/wallet">Кошелёк</Link>
      <Link to="/profile">Профиль</Link>
    </nav>
    <div className="header__right">
      {isAuth ? (
        <div className="user-menu">
          <img src={user.avatar} alt="avatar" className="user-menu__avatar" />
          <span>{user.name}</span>
          <button onClick={onLogout}>Выйти</button>
        </div>
      ) : (
        <>
          <button onClick={onLogin}>Войти</button>
          <button onClick={onRegister}>Регистрация</button>
        </>
      )}
    </div>
  </header>
);

export default Header;
