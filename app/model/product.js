const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },
  password: {
    type: String,
  },
  manufacturer_purl: {
    type: String,
  },
  sequence: {
    type: Number,
  },
  description: {
    type: String,
  },
  description_purchase: {
    type: String,
  },
  description_sale: {
    type: String,
  },
  type: {
    type: String,
  },
  rental: {
    type: Boolean,
  },
  categ_id: {
    type: Number,
  },
  image_1920: {
    type: Array,
  },
  country: {
    type: String,
  },
  language: {
    type: String,
  },
  id: {
    type: String,
  },
  manufacturer_pref: {
    type: String,
  },
  marketplace_seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "An Employee Must be there to recieve message"],
  },
  public_categ_ids: {
    type: String,
  },
  list_price: {
    type: Number,
  },
  volume: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  sale_ok: {
    type: Boolean,
  },
  purchase_ok: {
    type: Boolean,
  },
  uom_id: {
    type: String,
  },
  uom_po_id: {
    type: String,
  },
  company_id: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  color: {
    type: String,
  },
  default_code: {
    type: String,
  },

  can_image_1024_be_zoomed: {
    type: Boolean,
  },
  has_configurable_attributes: {
    type: Boolean,
  },
  message_main_attachment_id: {
    type: String,
  },
  create_uid: {
    type: String,
  },
  create_date: {
    type: Date,
  },
  write_uid: {
    type: String,
  },
  write_date: {
    type: Date,
  },
  sale_delay: {
    type: String,
  },
  tracking: {
    type: String,
  },
  description_picking: {
    type: String,
  },
  description_pickingout: {
    type: String,
  },
  description_pickingin: {
    type: String,
  },
  service_type: {
    type: String,
  },
  sale_line_warn: {
    type: String,
  },
  sale_line_warn_msg: {
    type: String,
  },
  expense_policy: {
    type: String,
  },
  invoice_policy: {
    type: String,
  },
  website_description: {
    type: String,
  },
  website_size_x: {
    type: String,
  },
  website_size_y: {
    type: Number,
  },
  website_sequence: {
    type: Number,
  },
  rating_last_value: {
    type: Number,
  },
  website_meta_title: {
    type: String,
  },
  website_meta_description: {
    type: String,
  },
  website_meta_keywords: {
    type: String,
  },
  website_meta_og_img: {
    type: String,
  },
  website_id: {
    type: Number,
  },
  is_published: {
    type: Boolean,
  },
  hs_code: {
    type: String,
  },
  inventory_availability: {
    type: String,
  },
  available_threshold: {
    type: Number,
  },
  custom_message: {
    type: String,
  },
  status: {
    type: String,
  },
  qty: {
    type: Number,
  },
  template_id: {
    type: String,
  },
  marketplace_seller_id: {
    type: String,
  },
  is_initinal_qty_set: {
    type: Boolean,
  },
  activity_date_deadline: {
    type: Date,
  },
  is_global_product: {
    type: Boolean,
  },
  global_product_tmpl_id: {
    type: String,
  },
  mp_display: {
    type: Boolean,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Product = mongoose.model("product", ProductSchema);
