const express = require("express");
const router = express.Router();
const axios = require("axios");
const { spawn, execFile } = require("child_process");
const Odoo = require("odoo-await");

const odoo = new Odoo({
  baseUrl: process.env.ODOO_BASE_URL,
  port: process.env.ODOO_PORT,
  db: process.env.ODOO_DB,
  username: process.env.ODOO_USERNAME,
  password: process.env.ODOO_PASSWORD,
});

router.post("/", async (req, res) => {
  try {
    const r = await axios.get(
      "http://172.105.36.229:8072/api/auth/get_tokens?username=admin&password=admin&access_lifetime=0"
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
    console.log(token);
    let row_product_list = [
      {
        name: "VIGOROSO Boys Girls Children Kids Digital Pu Watch Transformers Bumblebee Cartoon Wristwatch",
        // # "manufacturer_pref" : "B01686BLDY",
        // # "manufacturer_purl" : "https://www.amazon.in/VIGOROSO-Children-Transformers-Bumblebee-Wristwatch/dp/B01686BLDY",
        // # "manufacturer" : "VIGOROSO",
        // # "mpn" : "W783.L",
        // # "main_image_link" : "https://images-na.ssl-images-amazon.com/images/I/61ic4xwLK-L._UL1005_.jpg",
        // # "images_row" : "https://images-na.ssl-images-amazon.com/images/I/61ic4xwLK-L._UL1005_.jpg|https://images-na.ssl-images-amazon.com/images/I/51u6rz-8DpL.jpg|https://images-na.ssl-images-amazon.com/images/I/51IcIhNH%2BCL.jpg|https://images-na.ssl-images-amazon.com/images/I/51tfRb7kJUL.jpg|https://images-na.ssl-images-amazon.com/images/I/51HDaJemkwL.jpg|https://images-na.ssl-images-amazon.com/images/I/61etmgvZAdL._UL1091_.jpg",
        sequence: 1,
        product_brand_id: "VIGOROSO",
        rating_avg: 4.0,
        description:
          "VIGOROSO Boys Children Kids Digital Pu Watch Transformers Bumblebee Cartoon Wristwatch (Blue Band),VIGOROSO",
        description_purchase: "purchase",
        description_sale:
          "<br>Condition: 100% Brand new <br> <br>Case Material: PU Case <br>Band Material: PU Rubber <br> <br>Features: <br>1. Digital display. <br>2. Comfortable watchband with classic color. <br>3. Robot can be removed. <br>4. Best gift for Boy's/Girls/Kids/Students. <br>5. Color: Yellow, Blue, Red, Gray. <br> <br>Specification(Approx): <br>Case Diameter: 4.2 cm <br>Case Thickness: 1.6 cm <br>Band Length: 22.2 cm <br>Band Width: 1.5 cm <br> <br>Maximum wrist circumference: 20.5 cm <br>Minimum wrist circumference: 15.0 cm <br> <br>You will get: 1 * Wristwatch <br>",
        type: "consu",
        purchase_line_warn: "no-message",
        sale_line_warn: "no-message",
        tracking: "none",
        list_price: 250.0,
        volume: 0.0,
        weight: 0.05,
        public_categ_ids: "Watches",
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
      },
    ];
    let row_data_list_product = [
      {
        product_id: "__import__._product_external_12302111",
        lst_price: 250.0,
        product_quantity: 4,
      },
    ];
    row_data_list_product.forEach(async datas => {
      try {
        const test = datas.product_id.split(".");
        let res1 = await axios.get(
          `http://172.105.36.229:8072/api/ir.model.data?filters=[('module', '=', '${test[0].toString()}'),('name', '=', '${test[1].toString()}')]`,
          getConfig
        );
        if (res1.data.count === 0) {
          row_product_list.forEach(async category => {
            try {
              console.log(category.product_brand_id);
              if (category.product_brand_id) {
                console.log("Chcek product_brand_id from product data.");
                const res_product_brand = await axios.get(
                  `http://172.105.36.229:8072/api/product.brand?filters=[('name', '=', '${category.product_brand_id}')]`,
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
                      "http://172.105.36.229:8072/api/product.brand",
                      data,
                      postConfig
                    );
                    console.log(res_product_brand_id.data);
                    category.product_brand_id = res_product_brand_id.data[0].id;
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
                const res_public_categ = await axios.get(
                  `http://172.105.36.229:8072/api/product.public.category?filters=[('name', '=', '${category.public_categ_ids}')]`,
                  getConfig
                );
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
                      "http://172.105.36.229:8072/api/product.public.category",
                      data,
                      postConfig
                    );
                    console.log(res_public_categ_id.data);
                    console.log("Created");
                    category.public_categ_ids = res_public_categ_id.data[0].id;
                  } catch (error5) {
                    console.log(error5);
                  }
                } else {
                  console.log("Already Created");
                  category.public_categ_ids =
                    res_public_categ.data.results[0].id;
                }
              }
              if (category.categ_id) {
                console.log("Chcek category_id from product data. ");
                const res_categ = await axios.get(
                  `http://172.105.36.229:8072/api/product.category?filters=[('name', '=', '${category.categ_id}')]`,
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
                      "http://172.105.36.229:8072/api/product.category",
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
                console.log("Chcekuom_id & uom_po_id from product data. ");
                const res_uom = await axios.get(
                  `http://172.105.36.229:8072/api/uom.uom?filters=[('name', '=', '${category.uom_id}')]`,
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
                        `http://172.105.36.229:8072/api/uom.uom?filters=[('name', '=', '${uom_categ.category_id}')]`,
                        getConfig
                      );
                      if (res_uom_categ.data.count === 0) {
                        const row_uom_category_list = [
                          {
                            name: uom_categ.category_id,
                          },
                        ];
                        const data = JSON.stringify(row_uom_category_list);
                        const res_uom_categ_id = await axios.post(
                          "http://172.105.36.229:8072/api/uom.category",
                          data,
                          postConfig
                        );
                        console.log(res_uom_categ_id.data);
                        console.log("Created");
                        uom_categ.category_id = res_uom_categ_id.data[0].id;
                      } else {
                        uom_categ.category_id =
                          res_uom_categ.data.results[0].id;
                      }
                      const data = JSON.stringify(row_uom_list);
                      const res_uom_id = await axios.post(
                        "http://172.105.36.229:8072/api/uom.uom",
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
          });
          const data = JSON.stringify(row_product_list);
          const res_prod = await axios.post(
            "http://172.105.36.229:8072/api/product.product",
            data,
            postConfig
          );
          res_prod.res_prod.data.forEach(async prod_id => {
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
                "http://172.105.36.229:8072/api/ir.model.data",
                data,
                postConfig
              );
              datas.product_id = prod_id.id;
            } catch (error8) {
              console.log(error8);
            }
          });
        } else {
          console.log("object");
          console.log(res1.data);
          datas.product_id = res1.data.results[0].res_id;
        }
        console.log("\n 2. reverse.auction.product - Create:");
        let data1 = JSON.stringify(row_data_list_product);
        const r_product = await axios.post(
          "http://172.105.36.229:8072/api/reverse.auction.product",
          data1,
          postConfig
        );
        const r_product_id = r_product.data[0];
        const row_data_list = [
          {
            name: "Script Reverse Auction",
            // # "mern_uuid" : "123-2453-uuid",
            partner_id: "Auction-user",
            buyer_billing_id: {
              street:
                "309, City Center Arcade, Nr. ST Bus Station, Krishnanagar, Nava Naroda",
              street2: "ahmedabad",
              city: "Ahmedabad",
              zip: "380001",
            },
            buyer_shipping_id: {
              street:
                "309, City Center Arcade, Nr. ST Bus Station, Krishnanagar, Nava Naroda",
              street2: "ahmedabad",
              city: "Ahmedabad",
              zip: "380001",
            },
            max_distance: 10,
            reserve_price: 100.0,
            hide_sellers_bid: false,
            unlock_bids: false,
            auction_end_date: "2021-05-27 12:00:00",
            auction_start_date: "2021-05-27 12:00:00",
            planned_date: "2021-05-27 12:00:00",
            auction_product_type: "stockable",
            state: "draft",
            buyer_msg: "Script Reverse Auction Description",
            auction_products: [
              {
                id: r_product_id.id,
              },
            ],
          },
        ];
        console.log("\n 3. reverse.auction - Create:");
        row_data_list.forEach(async data_list => {
          console.log("Check partner_id for Auction data.");
          try {
            const res_partner = await axios.get(
              `http://172.105.36.229:8072/api/res.partner?filters=[('name', '=', '${data_list.partner_id}')]`,
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
                  street:
                    "309, City Center Arcade, Nr. ST Bus Station, Krishnanagar, Nava Naroda",
                  city: "Ahmedabad",
                  zip: "380001",
                  email: "sellerScript@gmail.com",
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
                "http://172.105.36.229:8072/api/res.partner",
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
                `http://172.105.36.229:8072/api/res.partner?filters=[('parent_id', '=', ${res_partner.data.results[0].id}),('type', '=', 'delivery'),('street', '=', '${data_list.buyer_shipping_id.street}')]`,
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
                  "http://172.105.36.229:8072/api/res.partner",
                  data,
                  postConfig
                );
                data_list.buyer_billing_id = res_partner_address_id.data[0].id;
                data_list.buyer_shipping_id = res_partner_address_id.data[0].id;
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
              "http://172.105.36.229:8072/api/reverse.auction",
              data,
              postConfig
            );
            res.send({
              row_product_list,
              row_data_list_product,
              r_product_id,
              row_data_list,
              res: end_response.data,
            });
          } catch (error11) {
            console.log(error11);
          }
        });
      } catch (error1) {
        console.log(error1);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
module.exports = router;
// router.post("/createAuction", async (req, res) => {
//   try {
//     const { form } = req.body;
//     const {
//       auction_start_date,
//       auction_end_date,
//       planned_date,
//       auction_product_type,
//       state,
//       buyer_msg,
//       name,
//       max_distance,
//       reserve_price,
//       auction_products,
//     } = form;
//     const ress = await axios.get(
//       " http://portal.gangala.in/api/auth/get_tokens?username=geminate&password=geminatecs&access_lifetime=0"
//     );
//     const config = {
//       headers: {
//         "Access-Token": ress.data.access_token,
//       },
//     };
//     if (!ress.data.access_token) {
//       return res.status(400).json({ msg: "Server is Slow at the Moment" });
//     }
//     const allAuction = await axios.get(
//       `http://portal.gangala.in/api/ir.model.data?filters=[('module', '=', '_product_import_'),('name', '=', '_watches_B01686BLDY')]`,
//       config
//     );
//     if (allAuction.count.length === 0) {
//       return res
//         .status(400)
//         .json({ msg: "These Products Could Exist In Odoo" });
//     }
//     row_data_list = [
//       {
//         name: name,
//         mern_uuid: "123-2453-uuid",
//         partner_id: 3,
//         buyer_billing_id: 3,
//         buyer_shipping_id: 3,
//         max_distance: 10,
//         reserve_price: 100.0,
//         hide_sellers_bid: false,
//         unlock_bids: false,
//         auction_end_date: "2021-05-27 12:00:00",
//         auction_start_date: "2021-05-27 12:00:00",
//         planned_date: "2021-05-27 12:00:00",
//         auction_product_type: "stockable",
//         state: "draft",
//         buyer_msg: "Script Reverse Auction Description",
//         auction_products: [
//           {
//             id: 1,
//           },
//           {
//             id: 8,
//           },
//         ],
//       },
//     ];
//     res.status(200).send(allAuction.data.results);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });
