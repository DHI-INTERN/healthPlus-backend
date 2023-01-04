/*const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, /*unique: true*//* },
    phone: { type: String, /*unique: true *//*},
    password: { type: String },
    address: { type: String, default: "" },
    about: { type: String, default: "" },
    type: { type: String, default: "user" },
    gst: { type: String, default: "" },
    addedon: { type: Date, default: Date.now }
});

const userModel = model("User", userSchema);

module.exports = userModel;*/

const mongoose = require('mongoose');
const DocSchema = mongoose.Schema({
    Docid:{
        type:String,
        required:true,
    },
    DocPass:{
        type:String,
        required:true,
    },
    DocName:{
        type:String,
        required:true,
    },
    DocPhone:{
        type:String,
        required:true,
    },
    DocAddress:{
        type:String,
        require:true
    },
    DateAdded:{
        type:Date,
        default:Date.now,
    }
});
const DocModel = mongoose.model("Doc",DocSchema);
module.exports = DocModel;