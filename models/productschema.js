const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
    },
    discount: {
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
