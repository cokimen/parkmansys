import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { AuditTrail } from "./BaseEntity"

@Entity({ name: "booking"})
export class Booking extends AuditTrail{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    capacityPerson: string

    @Column()
    reserveStatus: boolean

}
