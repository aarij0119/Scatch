const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,

    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
        trim: true
    },
    picture: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("user", userSchema);
