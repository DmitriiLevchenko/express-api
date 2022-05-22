import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ length: 1000, nullable: false })
  text: string;
}