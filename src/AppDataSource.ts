import * as path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, "/entities/*.ts")],
  synchronize: process.env.SYNCHRONIZE === "true",
});
