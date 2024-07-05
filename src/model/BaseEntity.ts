import { Column, CreateDateColumn } from "typeorm";

export class AuditTrail {
    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'datetime',
        name: 'create_at'
    })
    createAt: Date
    
    @Column()
    createBy: string


    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'datetime',
        name: 'update_at'
    })
    updateAt: Date


    @Column()
    updateBy: string
    
}