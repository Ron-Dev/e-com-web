require("dotenv").config();

const { PORT, PASSWORD_TOKEN } = process.env;

module.exports = {
  PORT,
  PASSWORD_TOKEN,
};
