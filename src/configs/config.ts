import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const DB_URL = process.env.DB_URL;
export const DB_CONNECTION = process.env.DB_CONNECTION;
export const BUCKET = process.env.BUCKET;
export const REGION = process.env.REGION;
export const ACCESS_KEY = process.env.ACCESS_KEY;
export const SECRET_KEY = process.env.SECRET_KEY;
