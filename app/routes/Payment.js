const router = require('express').Router();
// const Razorpay = require('razorpay')
const axios = require('axios')
// var instance = new Razorpay({ key_id: process.env.RAZORPAYKEY, key_secret: process.env.RAZORPAYSECRET })

//Ranjeet
// RAZORPAYKEY=rzp_test_9HweHH5nDr0QBJ
// RAZORPAYSECRET=iTJdNCU8rDfl64mXPFqOvS73
//Ranjeet

// Gangala
// RAZORPAYKEY=rzp_test_gVGfDjXyN42QeD
// RAZORPAYSECRET=ePzJI2FxIwaHBmdIJYhdJeUy
// Gangala


router.post('/', async (req, res) => {
    try {
        const { amount, description, customer, notes, callback_url } = req.body;
        let config = {
            "amount": parseInt(amount),
            "currency": process.env.RAZORPAYCURRENCY,
            "reference_id": "RID" + new Date().getTime() + Math.floor(Math.random() * 1098),
            "description": description,
            "customer": customer,
            "notes": notes,
            "callback_url": callback_url,
            "callback_method": "get"
        }
        axios.post("https://api.razorpay.com/v1/payment_links", config, {
            auth: {
                username: process.env.RAZORPAYKEY,
                password: process.env.RAZORPAYSECRET
            }
        })
            .then((result) => {
                // console.log(result);
                return res.status(200).send({ success: true, data: result.data });
            })
            .catch((error) => {
                console.log(error.response)
                return res.status(401).send({ success: false, error: error.message });
            })
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(ex.message);
    }
});
module.exports = router;