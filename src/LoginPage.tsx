import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      setMsg("Успешный вход!");
      setTimeout(() => navigate("/"), 800);
    } else {
      setMsg(data.message || "Ошибка");
    }
  };

  return (
    <div className="p2p-app">
      <h2>Вход</h2>
      <form onSubmit={handleLogin} style={{display: "flex", flexDirection: "column", gap: 16, marginTop: 24}}>
        <input
          placeholder="Логин"
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button className="buy-btn" type="submit">Войти</button>
      </form>
      <div style={{marginTop: 12, color: "#ffd600"}}>{msg}</div>
      <div style={{marginTop: 24}}>
        Нет аккаунта?{" "}
        <button className="filter-btn" onClick={() => navigate("/register")}>Зарегистрироваться</button>
      </div>
    </div>
  );
}
