import a from "./env/index";

const { NODE_ENV } = process.env;

const config = NODE_ENV === "development" ? a.dev : NODE_ENV === "production" ? a.prod : a.test;

export default config;