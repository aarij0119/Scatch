const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/app');
const ownerrouter = require('./routes/ownerrouter');
const userrouter = require('./routes/userroute');
const productrouter = require('./routes/productroute');
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

app.set("view engine", "ejs");
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret: "njfrnvrrngbv"
}))
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get('/',function(req,res){
    res.render("index");
});

app.get('/login',function(req,res){
    const errmessage =  req.flash("error")
    const errmessage2 = req.flash("error2")
    // console.log(errmessage2)
    res.render('login',{errmessage,errmessage2})
})

app.use("/owners", ownerrouter);
app.use("/users", userrouter);
app.use("/products", productrouter);

app.listen(3000)