import { ITransaction } from '@core/types/transactions.interface';
import { ICommand } from 'cqrs-flow';
export class NormalizeMerchantNameCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly transactions: ITransaction[],
  ) {}
}
