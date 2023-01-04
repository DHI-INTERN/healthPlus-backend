

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