import "dotenv/config";

const { 
     NODE_ENV,
     PORT, 
     TEST_DB_URL, 
     TEST_JWT_SECRET_KEY,
     TEST_REFRESH_SECRET,
    } 
    = process.env;

export default {
    NODE_ENV,
    PORT,
    DB_URL: TEST_DB_URL,
    JWT_SECRET_KEY: TEST_JWT_SECRET_KEY,
    REFRESH_SECRET: TEST_REFRESH_SECRET,

};
