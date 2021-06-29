const Product = require("./model/product");
const p = [
  {
    manufacturer_purl:
      "https://www.mykirana.com/grocery--staples/mdh-haldi-powder-1386",
    name: "MDH Haldi Powder",
    description_sale:
      "|Rich in spices|Tasty and easy to prepare.|To makes food tasty and delicious",
    list_price: "29",
    image_1920:
      "https://ik.imagekit.io/szjygawxdz/tr:w-600,h-600,pr-true,cm-pad_resize,bg-FFFFFF/image_humarashop/data/60011701037807.jpg",
    id: "__imported_products__._kirana_parchuniwala_s_60011701037807",
    type: "product",
    status: "pending",
    website_published: true,
    sale_ok: true,
    manufacturer_pref: "6.00117E+13",
    marketplace_seller_id: "__imported_sellers__._kirana_parchuniwala_s",
    public_categ_ids: "__imported_categ__._kirana_categ_grocery",
  },
  {
    manufacturer_purl:
      "https://www.mykirana.com/grocery--staples/mdh-haldi-powder-1386",
    name: "MDH Haldi Powder",
    description_sale:
      "|Rich in spices|Tasty and easy to prepare.|To makes food tasty and delicious",
    list_price: "29",
    image_1920:
      "https://ik.imagekit.io/szjygawxdz/tr:w-600,h-600,pr-true,cm-pad_resize,bg-FFFFFF/image_humarashop/data/60011701037807.jpg",
    id: "__imported_products__._kirana_modi_departmental_house_60011701037807",
    type: "product",
    status: "pending",
    website_published: true,
    sale_ok: true,
    manufacturer_pref: "6.00117E+13",
    marketplace_seller_id:
      "__imported_sellers__._kirana_modi_departmental_house",
    public_categ_ids: "__imported_categ__._kirana_categ_grocery",
  },
];
module.exports = async () => {
  for (const product of p) {
    const pp = new Product({
      ...product,
    });
    await pp.save();
    console.log("seeding Database");
  }

  // let products = await Product.find({});
  // products.forEach(async (p) => {
  //     p.images.forEach(async (i) => {
  //         download(`https://nadaasi-api.uc.r.appspot.com/uploads/${i}`, i, () => {
  //             console.log('downloaded ' + i);
  //         });
  //     })
  // })
  // for (let index = 0; index < products.length; index++) {
  //   const element = products[index];
  //   await Product.findByIdAndDelete(element._id);
  //   console.log(element);
  // // }
  // await mailer.sendMail(
  //     {

  //         from: "info@nadaasi.com",
  //         to: 'geekykoder@gmail.com',
  //         subject: "Verify Email Address",

  //         html: orderDetails(),

  //     },
  // );
  // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function () {
  //     console.log('done');
  // });
  console.log("finished seeding");
};
