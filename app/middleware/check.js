module.exports = {
    notAdmin: (req, res, next) => {
        if (!req.user.admin) {
            next();
        } else {
            res.status(403).json({ msg: "You are not an Administrator" });
        }
    }
};