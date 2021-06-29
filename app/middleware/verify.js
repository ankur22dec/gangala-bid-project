
const User = require('../model/User');

module.exports = {
    isAdmin: async (req, res, next) => {
        verifyUser = await User.findById(req.user.id);
        // console.log(verifyUser);
        // console.log(verifyUser._id);
        // console.log(verifyUser.admin);
        // return next();
        if (verifyUser.admin) {
            next();
        } else {
            console.log(verifyUser);
            res.status(403).json({ msg: "You are not an Administrator" });
        }
    }
};