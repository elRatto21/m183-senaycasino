const express = require("express");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const coinflipRoutes = require("./routes/coinflip");
const gameRoutes = require("./routes/game");
const sequelize = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');

const User = require("./models/User");
const Game = require("./models/Game");
const GameSession = require("./models/GameSession");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: [
        "'self'",
        "http://localhost:3000",
        "http://localhost:4000",
      ],
      fontSrc: ["'self'", "data:"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  }
}));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/coinflip", coinflipRoutes);
app.use("/api/game", gameRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
