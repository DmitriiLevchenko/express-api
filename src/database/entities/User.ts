import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { UserRole } from "../../common"
import { GroupEntity } from "./Group"

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 100, nullable: true })
    firstName: string

    @Column({ length: 100, nullable: true })
    lastName: string

    @Column({ length: 100, nullable: false })
    email: string

    @Column({ length: 500, nullable: false })
    password: string

    @ManyToMany(type => GroupEntity, group => group.users)
    @JoinTable()
    groups: GroupEntity[]

    @Column({ type: "enum", enum: UserRole, default: UserRole.GHOST })
    role: UserRole
}
