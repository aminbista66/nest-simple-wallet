import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class FundTransferDTO {
    @IsNotEmpty()
    receiverId: string;

    @IsNumber()
    @Min(1, { message: 'Amount must be greater than zero' })
    amount: number;
}