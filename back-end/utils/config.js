import dotenv from 'dotenv';
dotenv.config();

let MONGO_DB_LINK = process.env.MONGO_DB_LINK;
let SECRET = process.env.SECRET;

let config = {
    MONGO_DB_LINK,
    SECRET  
};

export default config;