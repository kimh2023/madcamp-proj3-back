import * as path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, "/entities/*.ts")],
  synchronize:
    process.env.SYNCHRONIZE === "true" || process.env.POPULATE === "true",
});
