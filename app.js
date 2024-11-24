const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/app');
const ownerrouter = require('./routes/ownerrouter');
const userrouter = require('./routes/userroute');
const productrouter = require('./routes/productroute');
const expressSession = require('express-session');
const flash = require('connect-flash');
const isloggedin = require('./middleware/isloggedin');
require('dotenv').config();

app.set("view engine", "ejs");
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "njfrnvrrngbv"
}))
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function (req, res) {
    const includeheader = false
    res.render("index",{includeheader});
});

app.get('/login', function (req, res) {
    const errmessage = req.flash("error")
    const errmessage2 = req.flash("error2")
    const includeheader = false
    // console.log(errmessage2)
    res.render('login', { errmessage, errmessage2, includeheader })
})
app.get('/logout', function (req, res) {
    res.cookie("token", "")
    res.redirect('/login')
    // return res.send("logout successfully")
})
app.use("/owners", ownerrouter);
app.use("/users", userrouter);
app.use("/products", productrouter);

app.listen(3000)