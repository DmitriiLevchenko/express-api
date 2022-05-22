import { DataSource } from "typeorm";
import { Event } from "../entities";


const dataSource = new DataSource(null);
export const EventRepository = dataSource.getRepository(Event)
