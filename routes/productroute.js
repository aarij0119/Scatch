const express = require('express');
const app = express();
const router = express.Router()

router.get('/product',function(req,res){
    res.send("product Route")
});

module.exports = router