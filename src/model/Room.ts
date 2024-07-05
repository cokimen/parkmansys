import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { AuditTrail } from "./BaseEntity"

@Entity({name : "room"})
export class Room extends AuditTrail{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    capacityPerson: string

    @Column()
    reserveStatus: boolean

}
