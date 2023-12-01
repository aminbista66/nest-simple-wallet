import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { UserModule } from 'src/user/user.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), UserModule, TransactionModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: []
})
export class WalletModule {}
