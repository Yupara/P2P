const express = require('express');
const app = express();

const offersRouter = require('./routes/offers');

app.use('/api/offers', offersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
