const express = require("express");
const cors = require("cors");

const app = express();

// Разрешаем CORS для фронтенда на Render
app.use(cors({
  origin: "https://p2p-3.onrender.com" // Замени на свой URL фронта!
}));

// Простейший маршрут для проверки
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend работает!" });
});

// Запуск сервера на порту, который нужен Railway
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend запущен на порту ${PORT}`);
});
