const express = require('express');
const app = express();
const router = express.Router()
const ownerModel = require('../models/owner');

// console.log(process.env.NODE_ENV)



// Register routes outside conditional blocks for consistency
if (process.env.NODE_ENV === "development") {
    router.get('/create', async function (req, res) {
        try {
            let owner = await ownerModel.find();
            if (owner.length > 0) {
                return res.status(403).send("You don't have permission to access this route.");
            }
            const createdOwner = await ownerModel.create({
                fullname: "Riyaz",
                email: "riyaz@gmail.com",
                password: 123456789,
                gstin: "12werevbnc"
            });

            res.status(201).json({ message: "Owner created successfully", owner: createdOwner });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("An error occurred.");
        }
    });
}


router.get('/', function (req, res) {
    res.send("Owner Route")

});


module.exports = router

