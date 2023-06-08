import dotenv from "dotenv";

dotenv.config();

export const clientApi = process.env.CLIENT_API;

export const dbHost = process.env.DB_HOST;
export const dbName = process.env.DB_NAME;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
export const dbPort = process.env.DB_PORT;
