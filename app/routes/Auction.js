const express = require("express");  
const router = express.Router();
const publicIp = require("public-ip");
var geoip = require("geoip-lite");
const axios = require("axios");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const Auction = require("../model/auction");
const { protect } = require("../middleware/auth");

const passportConfig = require("../passport");
router.get("/single/:id", protect, async (req, res) => {
  try {
    const country = await axios.get(
      "http://ipwhois.pro/json/?key=WgesGODgjdhblUP6"
    );
    console.log(country);
    const r = await axios.get(
      `http://${
        process.env[`${process.env[`ODOO_${country.data.country_code}`]}`]
      }/api/auth/get_tokens?username=admin&password=admin&access_lifetime=0`
    );
    const token = r.data.access_token;
    const getConfig = {
      headers: {
        "Access-Token": token,
      },
    };
    console.log(r.data.access_token);

    const res_auction = await axios.get(
      `http://${
        process.env[`${process.env[`ODOO_${country.data.country_code}`]}`]
      }/api/reverse.auction?filters=[('id', '=', ${req.params.id})]`,
      getConfig
    );
    if (res_auction.data.count === 0) {
      return res.status(200).json([]);
    } else {
      return res.status(200).json(res_auction.data.results[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
router.get("/getAuction", protect, async (req, res) => {
  try {
    const country = await axios.get(
      "http://ipwhois.pro/json/?key=WgesGODgjdhblUP6"
    );
    console.log(country);
    const r = await axios.get(
      `http://${
        process.env[`${process.env[`ODOO_${country.data.country_code}`]}`]
      }/api/auth/get_tokens?username=admin&password=admin&access_lifetime=0`
    );
    const token = r.data.access_token;
    const getConfig = {
      headers: {
        "Access-Token": token,
      },
    };
    const res_auction = await axios.get(
      `http://${
        process.env[`${process.env[`ODOO_${country.data.country_code}`]}`]
      }/api/reverse.auction?filters=[('mern_uuid', '=', "${req.user._id}")]`,
      getConfig
    );
    if (res_auction.data.count === 0) {
      return res.status(200).json([]);
    } else {
      return res.status(200).json(res_auction.data.results);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
router.post("/odoo", protect, async (req, res) => {
  try {
    const { form } = req.body;
    const {
      auction_start_date,
      auction_end_date,
      planned_date,
      auction_product_type,
      auction_type,
      street,
      street2,
      zip,
      city,
      state,
      buyer_msg,
      name,
      max_distance,
      reserve_price,
      auction_products,
    } = form;
    const country = await axios.get(
      "http://ipwhois.pro/json/?key=WgesGODgjdhblUP6"
    );
    console.log("country",country);
    const r = await axios.get(
      `http://${
        process.env[`${process.env[`ODOO_${country.data.country_code}`]}`]
      }/api/auth/get_tokens?username=admin&password=admin&access_lifetime=0`
    );
    const token = r.data.access_token;
    const getConfig = {
      headers: {
        "Access-Token": token,
      },
    };

    const postConfig = {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Token": token,
      },
    };
    console.log("oddo token",token);
    let row_product_list_updated = [];
    let row_product_list = auction_products.map(p => {
      return {
        id: uuidv4(),
        name: p.name,
        // # "manufacturer_pref" : "B01686BLDY",
        // # "manufacturer_purl" : "https://www.amazon.in/VIGOROSO-Children-Transformers-Bumblebee-Wristwatch/dp/B01686BLDY",
        // # "manufacturer" : "VIGOROSO",
        // # "mpn" : "W783.L",
        // # "main_image_link" : "https://images-na.ssl-images-amazon.com/images/I/61ic4xwLK-L._UL1005_.jpg",
        // # "images_row" : "https://images-na.ssl-images-amazon.com/images/I/61ic4xwLK-L._UL1005_.jpg|https://images-na.ssl-images-amazon.com/images/I/51u6rz-8DpL.jpg|https://images-na.ssl-images-amazon.com/images/I/51IcIhNH%2BCL.jpg|https://images-na.ssl-images-amazon.com/images/I/51tfRb7kJUL.jpg|https://images-na.ssl-images-amazon.com/images/I/51HDaJemkwL.jpg|https://images-na.ssl-images-amazon.com/images/I/61etmgvZAdL._UL1091_.jpg",
        sequence: 1,
        product_brand_id: p.product_brand_id,
        rating_avg: Number(p.rating_avg),
        description: p.description,
        description_purchase: "purchase",
        description_sale: p.description_sale,
        type: "consu",
        purchase_line_warn: "no-message",
        sale_line_warn: "no-message",
        tracking: "none",
        list_price: Number(p.list_price),
        volume: 0.0,
        weight: Number(p.weight),
        public_categ_ids: p.public_categ_ids.includes(",")
          ? p.public_categ_ids.split(",")[0].trim()
          : p.public_categ_ids.includes("&") &&
            p.public_categ_ids.split("&")[0].trim(),
        categ_id: "testing",
        uom_id: "demo-unit",
        uom_po_id: "demo-unit",
        default_code: "1510 211",
        service_type: "manual",
        expense_policy: "no",
        invoice_policy: "order",
        inventory_availability: "never",
        active: true,
        sale_ok: true,
        purchase_ok: true,
        is_published: true,
        rental: false,
        mp_display: false,
        is_global_product: false,
        can_image_1024_be_zoomed: false,
        has_configurable_attributes: false,
      };
    });
    let row_data_list_product = auction_products.map(p => {
      return {
        id: uuidv4(),
        product_id: p.id,
        lst_price: Number(p.list_price),
        product_quantity: Number(p.quantity),
      };
    });
    let row_data_list_product_updated = [];
    console.log(row_data_list_product);
    let indexForUsed = 0;

    var mainProcess = new Promise((resolve1, reject1) => {
      row_data_list_product.forEach(async (datas, index, array) => {
        try {
          const test = datas.product_id.split(".");
          let res1 = await axios.get(
            `http://${
              process.env[`${process.env[`ODOO_${country.data.country_code}`]}`]
            }/api/ir.model.data?filters=[('module', '=', '${test[0].toString()}'),('name', '=', '${test[1].toString()}')]`,
            getConfig
          );
          if (res1.data.count !== 0) {
            datas.product_id = res1.data.results[0].res_id;
            row_product_list_updated.push(row_product_list[indexForUsed]);
            row_data_list_product_updated.push(datas);
          }
          if (indexForUsed + 1 === row_data_list_product.length) {
            console.log("----------------------------------------------");
            resolve1();
          }
          indexForUsed++;
        } catch (error) {
          console.log(error);
        }
      });
    });
    mainProcess.then(function () {
      console.log("----------------------------------------------");
      row_data_list_product = row_data_list_product.filter(
        ar => !row_data_list_product_updated.find(rm => rm.id === ar.id)
      );
      row_product_list = row_product_list.filter(
        ar => !row_product_list_updated.find(rm => rm.id === ar.id)
      );
      console.log("------------------ID-------------");
      console.log("Spliced", row_data_list_product);
      console.log("pushed", row_data_list_product_updated);
      console.log("----------Products------------");
      console.log("Spliced", row_product_list);
      console.log("pushed", row_product_list_updated);
      var newProcess = new Promise((resolve2, reject2) => {
        if (row_data_list_product.length === 0) resolve2();
        row_data_list_product.forEach(async (datas, index2, array2) => {
          delete datas.id;
          try {
            console.log(datas);
            const test = datas.product_id.split(".");
            let res1 = await axios.get(
              `http://${
                process.env[
                  `${process.env[`ODOO_${country.data.country_code}`]}`
                ]
              }/api/ir.model.data?filters=[('module', '=', '${test[0].toString()}'),('name', '=', '${test[1].toString()}')]`,
              getConfig
            );
            var waitProcess = new Promise((resolve1, reject1) => {
              if (res1.data.count === 0) {
                var bar = new Promise((resolve, reject) => {
                  row_product_list.forEach(async (category, index, array) => {
                    delete category.id;
                    try {
                      console.log(category.product_brand_id);
                      if (category.product_brand_id) {
                        console.log(
                          "Chcek product_brand_id from product data."
                        );
                        const res_product_brand = await axios.get(
                          `http://${
                            process.env[
                              `${
                                process.env[`ODOO_${country.data.country_code}`]
                              }`
                            ]
                          }/api/product.brand?filters=[('name', '=', "${
                            category.product_brand_id
                          }")]`,
                          getConfig
                        );
                        console.log(res_product_brand.data);
                        if (res_product_brand.data.count === 0) {
                          console.log("Not Created");
                          const row_product_brand = [
                            {
                              name: category.product_brand_id,
                            },
                          ];
                          console.log(row_product_brand);
                          try {
                            const data = JSON.stringify(row_product_brand);
                            const res_product_brand_id = await axios.post(
                              `http://${
                                process.env[
                                  `${
                                    process.env[
                                      `ODOO_${country.data.country_code}`
                                    ]
                                  }`
                                ]
                              }172.105.36.229:8069/api/product.brand`,
                              data,
                              postConfig
                            );
                            console.log(res_product_brand_id.data);
                            category.product_brand_id =
                              res_product_brand_id.data[0].id;
                          } catch (error4) {
                            console.log(error4);
                          }
                        } else {
                          category.product_brand_id =
                            res_product_brand.data.results[0].id;
                        }
                      }
                      if (category.public_categ_ids) {
                        console.log("Public Cate id ");
                        console.log(category.public_categ_ids);
                        const res_public_categ = await axios.get(
                          `http://${
                            process.env[
                              `${
                                process.env[`ODOO_${country.data.country_code}`]
                              }`
                            ]
                          }/api/product.public.category?filters=[('name', '=', '${
                            category.public_categ_ids
                          }')]`,
                          getConfig
                        );
                        console.log("here");
                        console.log(res_public_categ.data);
                        if (res_public_categ.data.count === 0) {
                          console.log("Not Created");
                          const row_public_category_list = [
                            {
                              name: category.public_categ_ids,
                            },
                          ];
                          const data = JSON.stringify(row_public_category_list);
                          console.log(data);
                          try {
                            const res_public_categ_id = await axios.post(
                              `http://${
                                process.env[
                                  `${
                                    process.env[
                                      `ODOO_${country.data.country_code}`
                                    ]
                                  }`
                                ]
                              }/api/product.public.category`,
                              data,
                              postConfig
                            );
                            console.log(res_public_categ_id.data);
                            console.log("Created");
                            category.public_categ_ids = [
                              { id: res_public_categ_id.data[0].id },
                            ];
                          } catch (error5) {
                            console.log(error5);
                          }
                        } else {
                          console.log("Already Created");
                          category.public_categ_ids = [
                            { id: res_public_categ.data.results[0].id },
                          ];
                        }
                      }
                      if (category.categ_id) {
                        console.log("Chcek category_id from product data. ");
                        const res_categ = await axios.get(
                          `http://${
                            process.env[
                              `${
                                process.env[`ODOO_${country.data.country_code}`]
                              }`
                            ]
                          }/api/product.category?filters=[('name', '=', '${
                            category.categ_id
                          }')]`,
                          getConfig
                        );
                        console.log(res_categ.data);
                        if (res_categ.data.count === 0) {
                          console.log("Not Created category_id");
                          const row_category_list = [
                            {
                              name: category.categ_id,
                            },
                          ];
                          const data = JSON.stringify(row_category_list);
                          console.log(data);
                          try {
                            const res_categ_id = await axios.post(
                              `http://${
                                process.env[
                                  `${
                                    process.env[
                                      `ODOO_${country.data.country_code}`
                                    ]
                                  }`
                                ]
                              }/api/product.category`,
                              data,
                              postConfig
                            );
                            console.log(res_categ.data);
                            console.log("Created");
                            category.categ_id = res_categ_id.data[0].id;
                          } catch (error6) {
                            console.log(error6);
                          }
                        } else {
                          console.log("Already Created");
                          category.categ_id = res_categ.data.results[0].id;
                        }
                      }
                      if (category.uom_id) {
                        console.log(
                          "Chcekuom_id & uom_po_id from product data. "
                        );
                        const res_uom = await axios.get(
                          `http://${
                            process.env[
                              `${
                                process.env[`ODOO_${country.data.country_code}`]
                              }`
                            ]
                          }172.105.36.229:8069/api/uom.uom?filters=[('name', '=', '${
                            category.uom_id
                          }')]`,
                          getConfig
                        );
                        console.log(res_uom.data);
                        if (res_uom.data.count === 0) {
                          console.log("Not Created UOM_id");
                          const row_uom_list = [
                            {
                              name: category.uom_id,
                              category_id: "liquid",
                            },
                          ];
                          row_uom_list.forEach(async uom_categ => {
                            console.log("Chcek uom_categ_id from Uom data");
                            try {
                              const res_uom_categ = await axios.get(
                                `http://${
                                  process.env[
                                    `${
                                      process.env[
                                        `ODOO_${country.data.country_code}`
                                      ]
                                    }`
                                  ]
                                }172.105.36.229:8069/api/uom.uom?filters=[('name', '=', '${
                                  uom_categ.category_id
                                }')]`,
                                getConfig
                              );
                              if (res_uom_categ.data.count === 0) {
                                const row_uom_category_list = [
                                  {
                                    name: uom_categ.category_id,
                                  },
                                ];
                                const data = JSON.stringify(
                                  row_uom_category_list
                                );
                                const res_uom_categ_id = await axios.post(
                                  `http://${
                                    process.env.ODOO_ +
                                    country.data.country_code
                                  }/api/uom.category`,
                                  data,
                                  postConfig
                                );
                                console.log(res_uom_categ_id.data);
                                console.log("Created");
                                uom_categ.category_id =
                                  res_uom_categ_id.data[0].id;
                              } else {
                                uom_categ.category_id =
                                  res_uom_categ.data.results[0].id;
                              }
                              const data = JSON.stringify(row_uom_list);
                              const res_uom_id = await axios.post(
                                `http://${
                                  process.env[
                                    `${
                                      process.env[
                                        `ODOO_${country.data.country_code}`
                                      ]
                                    }`
                                  ]
                                }/api/uom.uom`,
                                data,
                                postConfig
                              );
                              category.uom_id = res_uom_id.data[0].id;
                              category.uom_po_id = res_uom_id.data[0].id;
                            } catch (error7) {
                              console.log(error7);
                            }
                          });
                        } else {
                          console.log("Already Created");
                          category.uom_id = res_uom.data.results[0].id;
                          category.uom_po_id = res_uom.data.results[0].id;
                        }
                      }
                    } catch (error3) {
                      console.error(error3);
                    }
                    if (index === array.length - 1) resolve();
                  });
                });
                bar
                  .then(async () => {
                    console.log("tesing");
                    console.log(row_product_list);
                    try {
                      const data = JSON.stringify(row_product_list);
                      const res_prod = await axios.post(
                        `http://${
                          process.env[
                            `${
                              process.env[`ODOO_${country.data.country_code}`]
                            }`
                          ]
                        }/api/product.product`,
                        data,
                        postConfig
                      );
                      console.log("tesing1");
                      console.log(res_prod.data);
                      res_prod.data.forEach(async prod_id => {
                        console.log(prod_id);
                        try {
                          const row_identifier_list = [
                            {
                              module: test[0],
                              name: test[1],
                              noupdate: true,
                              display_name: "Test Product",
                              model: "product.product",
                              res_id: prod_id.id,
                            },
                          ];
                          const data = JSON.stringify(row_identifier_list);
                          const res_model = await axios.post(
                            `http://${
                              process.env[
                                `${
                                  process.env[
                                    `ODOO_${country.data.country_code}`
                                  ]
                                }`
                              ]
                            }/api/ir.model.data`,
                            data,
                            postConfig
                          );
                          datas.product_id = prod_id.id;
                          row_data_list_product_updated.push(datas);
                          resolve1();
                          if (index2 === array2.length - 1) {
                            resolve2();
                          }
                        } catch (error8) {
                          console.log(error8);
                        }
                      });
                    } catch (error110) {
                      console.log(error110);
                    }
                  })
                  .catch(error1212 => {
                    console.log(error1212);
                  });
              } else {
                console.log("object");
                console.log(res1.data);
                datas.product_id = res1.data.results[0].res_id;
                resolve1();
              }
            });
            if (row_product_list.length > 0) {
            }
          } catch (error1) {
            console.log(error1);
          }
        });
        console.log("runnging");
        if (row_data_list_product.length === 0) {
          resolve2();
        }
      });

      newProcess
        .then(async () => {
          console.log("\n 2. reverse.auction.product - Create:");
          console.log(row_data_list_product_updated);
          let product_ids = [];
          var process = new Promise((resolve3, reject3) => {
            row_data_list_product_updated.forEach(
              async (product, index4, array4) => {
                delete product.id;
                console.log("inside Array");
                try {
                  let data_product = [product];
                  let data1 = JSON.stringify(data_product);
                  const r_product = await axios.post(
                    `http://${
                      process.env[
                        `${process.env[`ODOO_${country.data.country_code}`]}`
                      ]
                    }/api/reverse.auction.product`,
                    data1,
                    postConfig
                  );
                  const r_product_id = r_product.data[0];
                  product_ids.push(r_product_id);
                  if (index4 === array4.length - 1) {
                    resolve3();
                  }
                } catch (error111) {
                  console.log(error111);
                }
              }
            );
          });
          process.then(function () {
            const row_data_list = [
              {
                name: name,
                mern_uuid: req.user._id,
                partner_id: req.user.name,
                auction_type: auction_type,
                buyer_billing_id: {
                  street: street,
                  street2: street2,
                  city: city,
                  zip: zip,
                },
                buyer_shipping_id: {
                  street: street,
                  street2: street2,
                  city: city,
                  zip: zip,
                },
                max_distance: Number(max_distance),
                reserve_price: Number(reserve_price),
                hide_sellers_bid: false,
                unlock_bids: false,
                auction_end_date: moment(auction_end_date).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
                auction_start_date: moment(auction_start_date).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
                planned_date: moment(planned_date).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
                auction_product_type: "stockable",
                state: state,
                buyer_msg: buyer_msg,
                auction_products: product_ids.map(p => {
                  return { id: p.id };
                }),
              },
            ];
            console.log(row_data_list);
            console.log("\n 3. reverse.auction - Create:");
            row_data_list.forEach(async data_list => {
              console.log("Check partner_id for Auction data.");
              try {
                const res_partner = await axios.get(
                  `http://${
                    process.env[
                      `${process.env[`ODOO_${country.data.country_code}`]}`
                    ]
                  }/api/res.partner?filters=[('name', '=', '${
                    data_list.partner_id
                  }')]`,
                  getConfig
                );
                console.log(res_partner.data);
                if (res_partner.data.count === 0) {
                  const row_data_partner_list = [
                    {
                      name: data_list.partner_id,
                      active: true,
                      is_company: true,
                      company_type: "person",
                      type: "contact",
                      auto_approve_qty: false,
                      auto_product_approve: false,
                      can_publish: true,
                      claim_sms_sent: false,
                      cloud: false,
                      is_published: true,
                      seller: false,
                      verified_phone: false,
                      website_published: true,
                      display_name: data_list.partner_id,
                      street: street,
                      city: city,
                      zip: zip,
                      email: req.user.email,
                      mobile: "**********",
                      profile_url:
                        "https://www.crushpixel.com/big-static15/preview4/fotoeventis-2081298.jpg",
                      cloud_state: "new",
                      coordinate_calc: "by_addr",
                      invoice_warn: "no-message",
                      ks_time_format: "hour24",
                      lang: "en_US",
                      picking_warn: "no-message",
                      purchase_warn: "no-message",
                      sale_warn: "no-message",
                      state: "new",
                      trust: "normal",
                      tz: "Asia/Calcutta",
                      child_ids: [
                        {
                          type: "delivery",
                          street: data_list.buyer_shipping_id.street,
                          street2: data_list.buyer_shipping_id.street2,
                          city: data_list.buyer_shipping_id.city,
                          zip: data_list.buyer_shipping_id.zip,
                          email: "sellerScript@gmail.com",
                          mobile: "**********",
                        },
                      ],
                    },
                  ];
                  const data = JSON.stringify(row_data_partner_list);
                  const res_partner_id = await axios.post(
                    `http://${
                      process.env[
                        `${process.env[`ODOO_${country.data.country_code}`]}`
                      ]
                    }/api/res.partner`,
                    data,
                    postConfig
                  );
                  data_list.partner_id = res_partner_id.data[0].id;
                  data_list.buyer_billing_id = res_partner_id.data[0].id;
                  data_list.buyer_shipping_id = res_partner_id.data[0].id;
                } else {
                  console.log(
                    "Check buyer_shipping_id from related partner_id to Auction data. "
                  );
                  console.log({
                    dd: res_partner.data.results[0].id,
                    status: data_list.buyer_shipping_id.street,
                  });
                  let res_partner_address = await axios.get(
                    `http://${
                      process.env[
                        `${process.env[`ODOO_${country.data.country_code}`]}`
                      ]
                    }/api/res.partner?filters=[('parent_id', '=', ${
                      res_partner.data.results[0].id
                    }),('type', '=', 'delivery'),('street', '=', '${
                      data_list.buyer_shipping_id.street
                    }')]`,
                    getConfig
                  );
                  console.log(res_partner_address.data);
                  if (res_partner_address.data.count === 0) {
                    street_data = [
                      {
                        parent_id: res_partner.data.results[0].id,
                        type: "delivery",
                        street: data_list.buyer_shipping_id.street,
                        street2: data_list.buyer_shipping_id.street2,
                        city: data_list.buyer_shipping_id.city,
                        zip: data_list.buyer_shipping_id.zip,
                      },
                    ];
                    const data = JSON.stringify(street_data);
                    const res_partner_address_id = await axios.post(
                      `http://${
                        process.env[
                          `${process.env[`ODOO_${country.data.country_code}`]}`
                        ]
                      }/api/res.partner`,
                      data,
                      postConfig
                    );
                    data_list.buyer_billing_id =
                      res_partner_address_id.data[0].id;
                    data_list.buyer_shipping_id =
                      res_partner_address_id.data[0].id;
                  } else {
                    data_list.buyer_billing_id =
                      res_partner_address.data.results[0].id;
                    data_list.buyer_shipping_id =
                      res_partner_address.data.results[0].id;
                  }
                  data_list.partner_id = res_partner.data.results[0].id;
                }
                console.log(row_data_list);
                const data = JSON.stringify(row_data_list);
                const end_response = await axios.post(
                  `http://${
                    process.env[
                      `${process.env[`ODOO_${country.data.country_code}`]}`
                    ]
                  }/api/reverse.auction`,
                  data,
                  postConfig
                );
                console.log(end_response.data);
                res.status(200).json({ success: true });
              } catch (error11) {
                console.log(error11);
              }
            });
          });
        })
        .catch(errr => {
          console.log(errr);
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
