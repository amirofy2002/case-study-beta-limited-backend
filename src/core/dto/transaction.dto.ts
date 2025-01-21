import { ITransaction } from '@core/types/transactions.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class TransactionDto implements ITransaction {
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  description: string;
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  amount: number;
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  date: string;
}

export class NormalizeTransactionDto {
  @IsNotEmpty()
  @ApiProperty({ type: TransactionDto, required: true })
  transaction: TransactionDto;
}

export class DetectPatternsDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: TransactionDto, required: true, isArray: true })
  transactions: TransactionDto[];
}
