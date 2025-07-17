module.exports = function(app) {
  // Регистрация
  app.post('/api/register', require('../controllers/user').register);
  // Логин
  app.post('/api/login', require('../controllers/user').login);
  // Верификация паспорта
  app.post('/api/verify', require('../controllers/user').verifyPassport);
  // Получение профиля
  app.get('/api/profile', require('../controllers/user').getProfile);
  // ...и другие функции
};
