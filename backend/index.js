const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin:"https://p2p-production-8881.up.railway.app/" // замени на свой фронт!
}));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend работает!" });
});

app.listen(3001, () => console.log("Backend запущен на 3001"));
