const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array("image");
const dUri = new Datauri();
/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dataUri = p => dUri.format(path.extname(p.originalname), p.buffer);

module.exports = {
  multerUploads,
  dataUri,
};
