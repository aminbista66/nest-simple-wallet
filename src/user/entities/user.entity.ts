import { Transaction } from '../../transaction/entities/transaction.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity("authuser")
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Wallet, {cascade: true})
  @JoinColumn()
  wallet: Wallet

  @OneToMany(()=> Transaction, (transaction) => transaction.receiver)
  receivedTransactions: Transaction[]

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  sentTransactions: Transaction[]
}
