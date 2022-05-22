import { DataSource } from "typeorm";
import { Group } from "../entities";


const dataSource = new DataSource(null);
export const GroupRepository = dataSource.getRepository(Group)

