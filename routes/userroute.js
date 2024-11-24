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


const { registeruser, loginuser } = require('../controllers/userregister')


require('dotenv').config()


router.get('/', isloggedin, async function (req, res) {
    const products = await productModel.find()
    const addmessage = req.flash("success")
    res.render('shop', { products, addmessage })
})

router.get('/cart/:id', isloggedin, async function (req, res) {
    const user = await userModel.findOne({ email: req.user.email })
    // console.log(user)
    user.cart.push(req.params.id)
    await user.save()
    req.flash("success", "Add to cart")
    res.redirect('/users')
})

router.get('/cart', isloggedin, async function (req, res) {
    const user = await userModel.findOne({ email: req.user.email }).populate('cart');
    if (!user) {
        return res.status(404).send('User not found');
    }

    // No need to calculate `bill` in the route if it's done individually for each product in the template
    res.render('cart', { user });
});


// router.get('/cart', isloggedin, async function (req, res) {
//     const user = await userModel.findOne({emai: req.user.emai}).populate('cart');
//     const bill = Number(user.cart[0].productprice) + 20 - Number(user.cart[0].productdisc)
//     res.render('cart', { user , bill })
//     // console.log(user)
// })
router.post('/register', registeruser);

router.post('/login', loginuser);



module.exports = router
