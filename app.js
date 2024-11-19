const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/app');
const ownerrouter = require('./routes/ownerrouter');
const userrouter = require('./routes/userroute');
const productrouter = require('./routes/productroute');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
    res.render("index");
});

app.get('/login',function(req,res){
    res.render('login')
})

app.use("/owners", ownerrouter);
app.use("/users", userrouter);
app.use("/products", productrouter);

app.listen(3000)