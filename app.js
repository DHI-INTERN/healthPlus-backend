// Imports
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Routes
app.use("/api", authRoutes);

// Server configuration
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
