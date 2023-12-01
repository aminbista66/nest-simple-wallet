import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>, // @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(user: User) {
    /* The code `const userTransactions = await this.transactionRepository.find({ where: [{ sender: user },
    { receiver: user }], relations: ['receiver', 'sender'], });` is retrieving all transactions from the
    `transactionRepository` that involve the specified `user` as either the sender or the receiver. */
    const userTransactions = await this.transactionRepository.find({
      where: [{ sender: user }, { receiver: user }],
      relations: ['receiver', 'sender'],
    });

    /* The code is transforming the `userTransactions` array by mapping over each transaction object and
    creating a new object with modified properties. */
    const transformedTransactions = userTransactions.map(
      (transaction: Transaction) => {
        return {
          id: transaction.id,
          amount: transaction.amount,
          createdAt: transaction.createdAt,
          sender: {
            username:
              transaction.sender.username !== user.username
                ? transaction.sender.username.replace(/(?<=.).(?=.)/g, '*')
                : transaction.sender.username,
            email: transaction.sender.email,
          },
          receiver: {
            username:
              transaction.receiver.username !== user.username
                ? transaction.receiver.username.replace(/(?<=.).(?=.)/g, '*')
                : transaction.receiver.username,
            email: transaction.receiver.email,
          },
        };
      },
    );

    return transformedTransactions;
  }
}
