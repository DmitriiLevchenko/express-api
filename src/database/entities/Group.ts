import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './User';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @ManyToMany(type => UserEntity, user => user.groups, {
    cascade: true,
  })
  @JoinTable()
  users: UserEntity[]
}