const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Регистрация
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  // Здесь должна быть ваша логика регистрации пользователя
  res.json({ success: true, message: `Пользователь зарегистрирован!` });
});

// Логин
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Здесь должна быть ваша логика проверки пользователя
  res.json({ success: true, message: `Вход выполнен!`, token: "FAKE-TOKEN" });
});

// Получение данных профиля
app.get('/api/profile', (req, res) => {
  // Обычно тут нужна авторизация по токену
  res.json({ username: "", balance: 0 });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ошибка сервера!" });
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
