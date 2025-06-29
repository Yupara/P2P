import React from "react";

const Auth = () => {
  return (
    <div>
      <h2>Авторизация</h2>
      <form>
        <input type="text" placeholder="Логин" />
        <input type="password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Auth;
