import { DataSource } from "typeorm";
import { EventEntity } from "../entities";


const dataSource = new DataSource(null);
export const EventRepository = dataSource.getRepository(EventEntity)
