import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default: 0})
    balance: number;

    constructor(wallet: Partial<Wallet>) {
        Object.assign(this, wallet)
    }
}