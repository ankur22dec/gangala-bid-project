const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const { uploader } = require("../config/cloudinaryConfiguration");
const { multerUploads, dataUri } = require("../uploadArray");

const Product = require("../model/product");
const { protect } = require("../middleware/auth")
router.get("/", async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/search/:string", async (req, res) => {
  try {

    let text = req.params.string;

    let result = await Product.find({ name: { '$regex': text, '$options': 'i' } }).limit(50);
    res.status(200).json({ data: result })

  } catch (error) {
    console.log(error);
    res.status(404).send("Server Error");
  }
})
router.get("/range/:min/:max/:id", async (req, res) => {
  try {
    let min = parseInt(req.params.min);
    let max = parseInt(req.params.max);
    let perpage = 10;
    let id = req.params.id;
    let skip = id * perpage;

    const getProducts = await Product.aggregate([
      {
        '$addFields': {
          'list_price_num': {
            '$convert': {
              'input': '$list_price',
              'to': 'double'
            }
          }
        }
      }, {
        '$match': {
          'list_price_num': {
            '$lte': max,
            '$gte': min
          }
        }
      }
      , {
        '$skip': skip,
      },
      {
        '$limit': perpage
      }
    ])
    res.status(200).json({ data: getProducts, total: getProducts.length, count: 0 });
  } catch (error) {
    console.log(error);
    res.status(404).send("Server Error");
  }
})
router.get("/:id", async (req, res) => {
  try {
    let perpage = 10;
    let id = req.params.id;
    let skip = id * perpage;
    const product = await Product.find({}).limit(perpage).skip(skip);
    const count = await Product.find({}).count();
    res.status(200).json({ data: product, total: count });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
router.get("/detail/:id", async (req, res) => {
  try {

    let id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({ data: product, success: true });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
router.get(
  "/sellerProduct",
  protect,
  async (req, res) => {
    try {
      const product = await Product.find({
        marketplace_seller_id: req.user.id,
      });
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);
router.post(
  "/createProduct",
  protect,
  multerUploads,
  async (req, res) => {
    let newProduct;
    try {
      console.log(req.files);
      let files = [];
      const { name, description, price } = req.body;
      req.files.forEach((f, i) => {
        let file = dataUri(f).content;
        uploader
          .upload(file)
          .then(async result => {
            files.push(result.url);
            if (req.files.length === i + 1) {
              console.log(files[0]);
              console.log(name);
              newProduct = new Product({
                marketplace_seller_id: req.user.id,
                name: name,
                list_price: price,
                description_picking: description,
                image_1920: files,
              });
              const p = await newProduct.save();
              console.log(p);
            }
            return res.status(200).json({ response: true });
          })
          .catch(err => {
            console.log(err);
          });
      });
      console.log(files);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
