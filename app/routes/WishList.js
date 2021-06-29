const express = require("express");
const router = express.Router();
const WishList = require("../model/WishList");
const { protect } = require('../middleware/auth')
router.post(
    "/",
    async (req, res) => {
        console.log(req.body);
        const getData = await WishList.find(req.body);
        console.log("ABCD", getData);
        if (getData.length > 0) {
            res.status(404).json({ success: false, error: "Product already in the user wishlist" });
        } else {
            const wishlist = await WishList.create(req.body)

            if (wishlist) {
                return res.status(200).json({ success: true, data: wishlist })
            } else {
                return res.status(404).json({ success: false, error: "There is some error while adding to wishlist." })
            }
        }
    }
);
router.delete(
    "/",
    async (req, res) => {
        try {
            console.log(req.body);
            const getData = await WishList.findOneAndDelete(req.body);
            return res.status(200).json({ success: true, data: "Deleted" })
        } catch (error) {
            console.log(error);
        }

    }
);

router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const getData = await WishList.find({ userID: id });
        return res.status(200).json({ success: true, data: getData });

    } catch (error) {
        res.status(404).json({ success: false, error: "There is some error." })
    }
})
router.get("/products/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const getData = await WishList.find({ userID: id }).populate("productID");
        console.log(getData);
        return res.status(200).json({ success: true, data: getData });

    } catch (error) {
        res.status(404).json({ success: false, error: "There is some error." })
    }
})
module.exports = router;
