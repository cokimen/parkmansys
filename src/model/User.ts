import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { AuditTrail } from "./BaseEntity"
import { RequestChange } from "./RequestChange"

@Entity({ name: "user"})
export class User extends AuditTrail{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "first_name", default: ""} )
    firstName: string

    @Column({ name: "last_name", default: ""})
    lastName: string

    @Column({ nullable: false, unique: true})
    email: string

    @Column({ name: "is_active", default: true})
    isActive: boolean

    @Column({nullable: false})
    password: string

    @Column({nullable: true, default: "UNKNOWN"})
    division: string

    @Column({ name: "birth_date", nullable: true})
    birthDate: Date

    @Column({ nullable: true})
    sex: string

    @Column({nullable: true})
    age: number

    requestChanges: Array<RequestChange>


}
