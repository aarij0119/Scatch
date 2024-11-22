const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isloggedin = require('../middleware/isloggedin');
const productModel = require('../models/productschema');
const path = require('path')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.use(cookieParser());


const {registeruser,loginuser} = require('../controllers/userregister')


require('dotenv').config()


router.get('/',isloggedin, async function(req,res){
const products = await productModel.find()
// console.log(products)
res.render('shop',{ products })
})
router.post('/register', registeruser);

router.post('/login', loginuser);



module.exports = router