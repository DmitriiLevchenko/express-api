import { DataSource } from "typeorm";
import { GroupEntity } from "../entities";


const dataSource = new DataSource(null);
export const GroupRepository = dataSource.getRepository(GroupEntity)

