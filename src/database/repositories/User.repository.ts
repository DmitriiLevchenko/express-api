import { DataSource } from "typeorm";
import { UserEntity } from "../entities";

const dataSource = new DataSource(null);
export const UserRepository = dataSource.getRepository(UserEntity)
  .extend({
    findByName(firstName: string, lastName: string) {
      return this.createQueryBuilder("user")
        .where("user.firstName = :firstName", { firstName })
        .andWhere("user.lastName = :lastName", { lastName })
        .getMany()
    },
  })
