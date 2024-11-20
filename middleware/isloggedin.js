const jwt = require('jsonwebtoken')


module.exports = function isloggedin(req, res, next) {
    try {
        if (req.cookies.token == "") {
            req.flash("error2", "you need to login first")
            return res.redirect('/login')
        }
        else {
            const verifyUser = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            req.user = verifyUser;
            // console.log("user is this", req.user)
            next()
        }
    }
    catch (err) {
        req.flash("error", "Invalid token. Please login again."); return res.redirect('/');
    }

}