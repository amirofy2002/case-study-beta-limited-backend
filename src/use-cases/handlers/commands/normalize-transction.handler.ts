import { normalizeTransactionPrompt } from '@core/consts/normalze.prompt';
import { NormalizeMerchantNameCommand } from '@core/definitions/commands/normalize-merchant.command';
import { extractArray } from '@core/shared/extract-array';
import { GenericService } from '@core/shared/generic-service';
import { GroqService } from '@frameworks/groq/groq.service';
import { CommandHandler, ICommandHandler } from 'cqrs-flow';

@CommandHandler(NormalizeMerchantNameCommand)
export class NormalizeMerchantNameCommandHandler
  extends GenericService
  implements ICommandHandler<NormalizeMerchantNameCommand>
{
  constructor(private readonly groq: GroqService) {
    super();
  }
  async execute(command: NormalizeMerchantNameCommand): Promise<any> {
    const { transactions } = command;
    const prompt = normalizeTransactionPrompt(transactions);
    const reponse = await this.groq.complete(prompt);
    const arr = extractArray(reponse);
    return JSON.parse(arr);
  }
}
