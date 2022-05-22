import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { UserRole } from "../../common"
import { Group } from "./Group"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 100, nullable: false })
    firstName: string

    @Column({ length: 100, nullable: false })
    lastName: string

    @ManyToMany(type => Group, group => group.users)
    @JoinTable()
    groups: Group[]

    @Column({ type: "enum", enum: UserRole, default: UserRole.GHOST })
    role: UserRole
}
