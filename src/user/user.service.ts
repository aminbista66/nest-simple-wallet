import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from './dto/user-create.dto';
import * as argon from 'argon2';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(requestBody: UserCreateDTO) {
    const wallet = new Wallet({ balance: 0 });
    const user = new User({
      username: requestBody.username,
      email: requestBody.email,
      password: await argon.hash(requestBody.password),
      wallet: wallet
    });
    return this.BuildResponse(await this.entityManager.save(user));
  }

  private BuildResponse(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      wallet: {
        id: user.wallet.id,
      }
    };
  }
}
