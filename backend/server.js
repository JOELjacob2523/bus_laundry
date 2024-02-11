const express = require('express');
const app = express();
const CONFIG = require('./config.json')
const cors = require('cors');
const infoRouter = require('./routes/router')

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

app.use(infoRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server listening on port ${CONFIG.PORT}`);
});