import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    constructor(transaction: Partial<Transaction>) {
        Object.assign(this, transaction)
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default: 0})
    amount: number;

    @ManyToOne(()=> User, (user)=> user.receivedTransactions)
    receiver: User;

    @ManyToOne(()=> User, (user) => user.sentTransactions)
    sender: User;

    @CreateDateColumn()
    createdAt: Date;
}