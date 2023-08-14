import * as dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env["NODE_ENV"] ?? "development";
const production = NODE_ENV === "production";
export const handlerRoot = production ? "dist" : "src";

export const handlerFileFilter = production ? "*.js" : "*.ts";
