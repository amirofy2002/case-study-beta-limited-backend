import { DetectPatternsCommand } from '@core/definitions/commands/detect-pattern.command';
import { NormalizeMerchantNameCommand } from '@core/definitions/commands/normalize-merchant.command';
import { GenericService } from '@core/shared/generic-service';
import { retry } from '@core/shared/retry';
import { ITransaction } from '@core/types/transactions.interface';
import { Injectable } from '@nestjs/common';
import { CommandBus } from 'cqrs-flow';

@Injectable()
export class ProcessTransactionUsecase extends GenericService {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async normalizeTransaction(transactions: ITransaction[]) {
    const response = await retry(
      this.commandBus.publish(
        new NormalizeMerchantNameCommand('normalize', transactions),
      ),
      3,
    );
    return response;
  }

  async detectPattern(transactions: ITransaction[]) {
    const response = await retry(
      this.commandBus.publish(
        new DetectPatternsCommand('detect', transactions),
      ),
      3,
    );
    return response;
  }

  async processBatch(data: Buffer) {
    let descriptionIndex = 0;
    let amountIndex = 1;
    let dateIndex = 2;

    const lines = data.toString().split('\n');
    const headers = lines[0].split(',');
    dateIndex = headers.findIndex((header) =>
      header.toLowerCase().includes('date'),
    );
    amountIndex = headers.findIndex((header) =>
      header.toLowerCase().includes('amount'),
    );
    descriptionIndex = headers.findIndex((header) =>
      header.toLowerCase().includes('description'),
    );

    const transactions: ITransaction[] = lines.slice(1).map((line) => {
      const parts = line.split(',');
      return {
        description: this.clearText(parts[descriptionIndex]),
        amount: parseFloat(this.clearText(parts[amountIndex])),
        date: this.clearText(parts[dateIndex]),
      };
    });
    const [patterns, normalized] = await Promise.all([
      this.detectPattern(transactions),
      this.normalizeTransaction(transactions),
    ]);
    return [transactions, patterns, normalized];
  }
  private clearText(text: string) {
    return text.trim().replaceAll('"', '').replaceAll('\\', '');
  }
}
