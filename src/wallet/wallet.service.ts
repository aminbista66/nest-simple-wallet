import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { FundTransferDTO } from './dtos/fund-transfer.dto';
import { Transaction } from '../transaction/entities/transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private entityManager: EntityManager,
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>
  ) {}

  async walletSummary(user: User) {
    const { wallet, ...result } = await  this.userRepository.findOne({
      where: { id: user.id },
      relations: { wallet: true },
    });
    
    return wallet
  }

  async fundTransfer(receiverId:string, amount:number, user: User) {
    const senderWallet = await this.walletSummary(user);
    const receiver = await this.userRepository.findOneBy({id: receiverId});

    if (senderWallet.balance < amount) {
        throw new ForbiddenException("Not enough balance")
    }

    const receiverWallet = await this.walletSummary(receiver);
    receiverWallet.balance += amount;
    this.entityManager.save(receiverWallet);

    senderWallet.balance -= amount;
    this.entityManager.save(senderWallet);

    const transaction = new Transaction({
        amount: amount,
        sender: user,
        receiver: receiver
    })

    this.entityManager.save(transaction)
    return {message: "Fund transfer successful"}
  }

}
