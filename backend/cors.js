// Этот файл настраивает CORS для вашего Express-приложения

const cors = require('cors');

const allowedOrigins = [
  'p2p-production-c7cd.up.railway.app', // Ваш фронтенд на Railway
  'http://localhost:80',                    // Локальная разработка фронта
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // если нужно передавать куки и авторизацию
};

module.exports = cors(corsOptions);
