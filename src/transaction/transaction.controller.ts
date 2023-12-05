import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Transactions")
@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Get('')
    async getAll(@Req() request) {
        return await this.transactionService.getAll(request.user);
    }
}
