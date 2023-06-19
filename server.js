const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const databaseConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

dotenv.config({ path: "config.env" });
// connect with database
databaseConnection();

// initialize express application
const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// mount routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  // create error and send it to error handling middleware
  const err = new Error(`Can't find this route: ${req.originalUrl}`);
  next(err.message);
});

// global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ err });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
