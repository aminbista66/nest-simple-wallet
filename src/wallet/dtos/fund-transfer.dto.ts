import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class FundTransferDTO {
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-4466554adad221de"
    })
    @IsNotEmpty()
    receiverId: string;

    @ApiProperty({
        example: 2000
    })
    @IsNumber()
    @Min(1, { message: 'Amount must be greater than zero' })
    amount: number;

    transactionPin: string;
}