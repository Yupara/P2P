const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Настройка CORS — пропиши сюда адрес своего фронта!
const allowedOrigins = [
  'https://p-production-c7cd.up.railway.app', // твой фронт
  'http://localhost:3000',                    // для локальной разработки
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Пример тестового роута — фронт будет делать сюда запрос
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend работает!' });
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
