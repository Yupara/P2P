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

// Места для подключения роутов
// require('./routes/user')(app);
// require('./routes/deal')(app);
// require('./routes/dispute')(app);
// require('./routes/message')(app);
// require('./routes/admin')(app);
// require('./routes/support')(app);

// Пример базового роута
app.get('/', (req, res) => {
  res.json({ message: 'P2P Exchange Backend is running!' });
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
