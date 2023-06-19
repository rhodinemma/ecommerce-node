const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  });
};

module.exports = databaseConnection;
