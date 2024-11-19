const mongoose = require('mongoose');
 
const ownerschema =  mongoose.Schema({
    fullname:{
        type:String,
        trim: true
    },
    email:{
        type:String,
        trim: true
    },
    password:{
        type:String
    },
    products:{
        type:Array,
        default:[]
    },
    picture:{
        type:String
    },
    gstin:{
        type:String
    }
});

module.exports = mongoose.model("owner",ownerschema)