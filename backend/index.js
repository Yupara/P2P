const express = require("express");
const cors = require("cors");
const app = express();

// Разрешить запросы с любых доменов
app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend работает!" });
});

app.listen(3001, () => console.log("Backend запущен на 3001"));
