const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../utilities/generatetoken');



exports.registeruser = async function (req, res) {
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
                    const token = generateToken(user);
                    res.cookie("token", token)
                    res.redirect('/users')
                    // return res.status(201).json({ message: "User created successfully", user });
                }
            })
        })
    }
    catch (err) {
        res.send(err.message)
    }
};
exports.loginuser = async function (req, res) {
    let { email, password } = req.body;
    try {
        let finduser = await userModel.findOne({ email });

        if (!finduser) {
            req.flash("error", "Sorry, you don't have an account");
            return res.redirect('/login')
        }

        bcrypt.compare(password, finduser.password, function (err, result) {
            if (err) {
                return res.status(500).send("Error during password comparison");
            }

            if (result) {
                // Generate JWT token after successful login
                const token = generateToken(finduser);

                // Set token in an HTTP-only cookie for security
                res.cookie("token", token);

                // Send success response after setting cookie
                return res.redirect('/users');
            } else {
                return res.status(401).send('Invalid password');
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

