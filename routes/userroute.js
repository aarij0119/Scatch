const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isloggedin = require('../middleware/isloggedin') 



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.use(cookieParser());


const {registeruser,loginuser} = require('../controllers/userregister')


require('dotenv').config()

router.get('/', function (req, res) {
    res.send("hello")
})

router.post('/get', registeruser);

router.post('/login', loginuser);


router.get('/logout', function (req, res) {
    res.cookie("token", "")
    return res.send("logout successfully")
})



router.get('/profile', isloggedin , function (req, res) {
    console.log(req.flash("error2"))
    res.send("hello from profile")
})





module.exports = router