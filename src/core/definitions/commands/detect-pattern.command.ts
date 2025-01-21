import { ITransaction } from '@core/types/transactions.interface';
import { ICommand } from 'cqrs-flow';
export class DetectPatternCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly transaction: ITransaction,
  ) {}
}
