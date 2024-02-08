const express = require('express');
const app = express();
const CONFIG = require('./config.json')
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server listening on port ${CONFIG.PORT}`);
});