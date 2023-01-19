const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));

mongoose.connect("mongodb+srv://iJai007:gN7za480EO6HT713@cluster0.gshc7im.mongodb.net/trial2").then(function() {
//NLnB2vd9UQrXL9ac

    app.get("/", function(req, res) {
        res.send("Webapp backend");
    });

    const userRoutes = require('./routes/user_routes');
    app.use("/api/user", userRoutes);

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Server started at PORT: ${PORT}`);
});
