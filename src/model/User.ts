import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { AuditTrail } from "./BaseEntity"
import { RequestChange } from "./RequestChange"

@Entity({ name: "user"})
export class User extends AuditTrail{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "first_name"} )
    firstName: string

    @Column({ name: "last_name"})
    lastName: string

    @Column({ nullable: false, unique: true})
    email: number

    @Column({ name: "is_active"})
    isActive: boolean

    @Column()
    password: string

    @Column()
    division: string

    @Column({ name: "birth_date"})
    birthDate: Date

    @Column()
    sex: string

    @Column()
    age: number

    requestChanges: Array<RequestChange>


}
