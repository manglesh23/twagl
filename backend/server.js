const express = require("express");
const cors = require('cors');
require("dotenv").config();
const { router } = require("./authrouter/authrouter");
const { connectDatabase } = require("./databaseConnection/databaseConnection");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
const PORT = process.env.PORT;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening at ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("database connection error:-", e);
    return {
      error: true,
      details: e,
    };
  });
