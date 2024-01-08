// creating utils folder and config file to store .env datas

const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI= process.env.MONGO_URI;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  MONGO_URI,
  PORT,
  SECRET_KEY
}

// 