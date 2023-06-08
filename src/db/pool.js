import { dbUsername, dbHost, dbName, dbPassword, dbPort } from "../config";

import { Pool } from "pg";

const pool = new Pool({
  user: dbUsername,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: dbPort,
  ssl: true,
});

export default pool;
