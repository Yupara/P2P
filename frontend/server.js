const express = require('express');
const path = require('path');
const app = express();

// Используем порт из окружения или 3000 по умолчанию (но Railway передаст свой)
const port = process.env.PORT || 3000;

// Раздача статики (проверь свою папку - build или dist)
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
