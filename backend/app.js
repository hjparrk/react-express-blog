const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    secure: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", homeRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
