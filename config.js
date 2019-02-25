const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  BASE_URL: process.env.API_URL,
  API_KEY_PARAM: process.env.API_KEY
};