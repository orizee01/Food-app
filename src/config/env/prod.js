import 'dotenv/config';
  
const { 
  NODE_ENV,
  PORT,
  PROD_DB_URL,
  PROD_JWT_SECRET_KEY,
  PROD_REFRESH_SECRET,
} 
= process.env;


export default {
    NODE_ENV,
    PORT,
    DB_URL: PROD_DB_URL,
    JWT_SECRET_KEY: PROD_JWT_SECRET_KEY,
    REFRESH_SECRET: PROD_REFRESH_SECRET,
    
}