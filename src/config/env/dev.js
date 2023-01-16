import 'dotenv/config';
  
const { 
  NODE_ENV,
  PORT,
  DEV_DB_URL,
  DEV_JWT_SECRET_KEY,
  DEV_REFRESH_SECRET
} 
= process.env;


export default {
    NODE_ENV,
    PORT,
    DB_URL: DEV_DB_URL,
    JWT_SECRET_KEY: DEV_JWT_SECRET_KEY,
    REFRESH_SECRET: DEV_REFRESH_SECRET,
    

}