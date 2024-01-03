import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';
import { FundTransferDTO } from './dtos/fund-transfer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Wallet")
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('wallet-summary')
  @UseGuards(AuthGuard('jwt'))  
  async walletSummary(@Req() request) {
    const { user } = request;
    return await this.walletService.walletSummary(user);
  }

  @Post('fund-transfer')
  @UseGuards(AuthGuard('jwt'))
  async fundTransfer(@Req() request, @Body() transferPayload: FundTransferDTO) {
    return await this.walletService.fundTransfer(
      transferPayload.receiverId,
      transferPayload.amount,
      request.user,
      transferPayload.transactionPin
    );
  }
}
