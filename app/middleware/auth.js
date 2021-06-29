const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../model/user");

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(400).json({ success: false, error: "Token not available" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}


// module.exports = (req, res , nex) => {

//     const token = req.header('x-auth-token')

//     if (!token) {
//         return res.status(401).json({ msg: 'No token , Authorization Denied' });
//     };
//     try {
//         const decode = jwt.verify(token, config.get('jwtsecret'));

//         req.user = decode.user;
//         next();
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({msg: 'Token is not valid'});
//     }
// }