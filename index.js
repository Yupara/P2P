const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Простой тестовый маршрут
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend работает!" });
});

// Railway задаёт порт через переменную окружения!
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
