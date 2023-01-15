const router = require('express').Router();
const DocModel = require('../models/Doc_model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('./../middlewares/jwt');


router.post("/createDoc", async function(req, res) {
    const docData = req.body;

    // Encrypt(Hash) the password
    /*const password = docData.DocPass;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    docData.DocPass = hashedPassword;
    */
    // Create the JWT Token
    const token = await jsonwebtoken.sign({ Docid: docData.Docid }, "thisismysecretkey");
    docData.token = token;

    const newUser = new DocModel(docData);
    await newUser.save(function(err) {
        if(err) {
            res.json({ success: false, error: err });
            console.log("User not created");
            return;
        }
        console.log("User created");
        res.json({ success: true, data: newUser });
    });
});

router.post("/login", async function(req, res) {
    const id = req.body.Docid;
    const password = req.body.DocPass;
    //new line
    const foundUser = await DocModel.findOne({ Docid :  id });
    if(!foundUser) {
        res.json({ success: false, error: "user-not-found" });
        console.log("User not found")
        console.log("Login fail");
        return;
    }

    //const correctPassword = await bcrypt.compare(password, foundUser.password);
    
    if(foundUser.DocPass != password ) {
        res.json({ success: false, error: "incorrect-password" });
        console.log("Login fail");
        return;
    }

    res.json({ success: true, data: foundUser });
    console.log("Login Success");
});

router.put("/", async function(req, res) {
    const docData = req.body;
    const userid = docData.userid;

    const result = await DocModel.findOneAndUpdate({ userid: userid }, docData);

    if(!result) {
        res.json({ success: false, error: "user-not-found" });
        return;
    }

    res.json({ success: true, data: docData });
});


module.exports = router;