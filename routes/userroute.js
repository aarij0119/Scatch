const express = require('express');
const app = express();
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.get('/', function (req, res) {
    res.send("hello")
})

router.post('/get', async function (req, res) {
    try {
        const { username, fullname, email, password } = req.body
        const userfind = await userModel.findOne({ email })
        if (userfind) {
            return res.status(400).send("Sorry, you already exist")
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    const user = await userModel.create({
                        username,
                        fullname,
                        email,
                        password: hash
                    });
                    const token = jwt.sign({ email, id: user._id }, "jbhbjjbhbn")
                    res.cookie("token", token)
                    return res.status(201).json({ message: "User created successfully", user });
                }
            })
        })
    }
    catch (err) {
        res.send(err.message)
    }
});

router.post('/login', async function (req, res) {
    let { email, password } = req.body;

    try {
        let finduser = await userModel.findOne({ email });

        if (!finduser) {
            return res.status(404).send("Sorry, you don't have an account");
        }

        bcrypt.compare(password, finduser.password, function (err, result) {
            if (err) {
                return res.status(500).send("Error during password comparison");
            }

            if (result) {
                // Generate JWT token after successful login
                const token = jwt.sign({ email, id: finduser._id }, "jbhbjjbhbn");

                // Set token in an HTTP-only cookie for security
                res.cookie("token", token);

                // Send success response after setting cookie
                return res.send('Login successful');
            } else {
                return res.status(401).send('Invalid password');
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});


router.get('/logout', function (req, res) {
    res.cookie("token", "")
    return res.send("logout successfully")
})

function isloggedin(req, res, next) {
    if (req.cookies.token == "") {
        res.send("you should login")
    }
    else{
        const verifyUser = jwt.verify(req.cookies.token, "jbhbjjbhbn");
        req.user = verifyUser;
        // console.log("user is this", req.user)
        next()
    }
   
}

router.get('/profile', isloggedin, function (req, res) {
    res.send("hello from profile")
})





module.exports = router