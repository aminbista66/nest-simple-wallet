import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async walletSummary(user: User) {
    const { wallet, ...result } = await  this.userRepository.findOne({
      where: { id: user.id },
      relations: { wallet: true },
    });
    
    return wallet
  }
}
