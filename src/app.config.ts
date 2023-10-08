import * as dotenv from "dotenv";
import * as process from "process";
import type { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotenv.config();

export const AppConfigs = {
  title: "Stock",
  isProd:
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development",
  // healthUrl: process.env.HEALTH_URL,
  port: parseInt(process.env.HOST_PORT || "5001", 10) || 5001,
  ALPHAVANTAGE_STOCK_API_KEY: process.env.ALPHAVANTAGE_STOCK_API_KEY || "",
  stockDb: {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    extra: {
      poolSize: 20,
      connectionTimeoutMillis: 6000,
      query_timeout: 6000,
      statement_timeout: 6000,
    },
  } as Partial<PostgresConnectionOptions>,
};
