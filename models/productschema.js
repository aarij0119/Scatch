const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    producname: {
        type: Buffer,
        required: true,
        trim: true
    },
    productprice: {
        type: Number,
    },
    productdisc: {
        type: Number,
        default:0
    },
    bgcolor:{
        type:String
    },
    panelcolor:{
        type:String
    },
    textcolor:{
        type:String
    }
});

module.exports = mongoose.model("product", productSchema);
