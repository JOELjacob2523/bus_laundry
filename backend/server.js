const express = require("express");
const app = express();
const session = require("express-session");
const CONFIG = require("./config.json");
const cors = require("cors");
const userInfoRouter = require("./routes/userRouter");
const bodyParser = require("body-parser");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(userInfoRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server listening on port ${CONFIG.PORT}`);
});
