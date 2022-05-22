import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User';

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @ManyToMany(type => User, user => user.groups, {
    cascade: true,
  })
  @JoinTable()
  users: User[]
}