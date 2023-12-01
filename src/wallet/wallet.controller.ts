import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Get("wallet-summary")
    @UseGuards(AuthGuard('jwt'))
    async walletSummary(@Req() request) {
      const { user } = request;
      return await this.walletService.walletSummary(user);
    }
}
