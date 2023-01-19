const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

// Import Routes
const userRoutes = require("./routes/user_routes");

// Middewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("uploads"));

app.get("/", function (req, res) {
  res.send("Webapp backend");
});
app.get("/test", function (req, res) {
  res.send("testing backend");
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api", userRoutes);

// DB Connection
const mongoURI =
  "mongodb+srv://iJai007:gN7za480EO6HT713@cluster0.gshc7im.mongodb.net/trial2";

mongoose.connect(mongoURI, () => {
  console.log("DB CONNECTED");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server started at PORT: ${PORT}`);
});
