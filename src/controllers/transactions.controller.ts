import { Controller, Post } from '@nestjs/common';

@Controller('transactions')
export class TransactionsController {
  @Post()
  postTransaction() {
    return 'Transaction created';
  }
}
