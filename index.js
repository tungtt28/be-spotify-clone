const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const artistRoute = require("./routes/artist");
const songRoute = require("./routes/song");
const playlistRoute = require("./routes/playlist");
const categoryRoute = require("./routes/category");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use("/v1/artist", artistRoute);
app.use("/v1/song", songRoute);
app.use("/v1/playlist", playlistRoute);
app.use("/v1/category", categoryRoute);

app.listen(8000, () => {
  console.log("Server is running...");
});
