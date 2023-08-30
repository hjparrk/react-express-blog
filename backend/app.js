const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", homeRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
