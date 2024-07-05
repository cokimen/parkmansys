import { Column, PrimaryGeneratedColumn, Entity } from "typeorm"
import { AuditTrail } from "./BaseEntity"


@Entity({name : "request_change"})
export class RequestChange extends AuditTrail {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    booking: string

    @Column()
    user: string

}