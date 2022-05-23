import { DataSource } from "typeorm";
import { TokenEntity } from "../entities";

const dataSource = new DataSource(null);
export const TokenRepository = dataSource.getRepository(TokenEntity)
