const express = require('express');
const path = require('path');
const app = express();

// Используем переменную окружения PORT, которую даёт Railway
const port = process.env.PORT || 3000;

// Раздаём статические файлы из папки build (или public — укажи свою папку)
app.use(express.static(path.join(__dirname, 'build')));

// Для SPA: отдаём index.html на все остальные маршруты
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
