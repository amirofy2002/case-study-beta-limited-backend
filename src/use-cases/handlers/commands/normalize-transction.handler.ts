import { LLM_KEYS } from '@core/consts/llm-keys.const';
import { normalizeTransactionPrompt } from '@core/consts/normalze.prompt';
import { NormalizeMerchantNameCommand } from '@core/definitions/commands/normalize-merchant.command';
import { extractArray } from '@core/shared/extract-array';
import { GenericService } from '@core/shared/generic-service';
import { LLM } from '@core/types/llm.interface';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from 'cqrs-flow';

@CommandHandler(NormalizeMerchantNameCommand)
export class NormalizeMerchantNameCommandHandler
  extends GenericService
  implements ICommandHandler<NormalizeMerchantNameCommand>
{
  constructor(
    @Inject(LLM_KEYS.GROQ)
    private readonly llm: LLM,
  ) {
    super();
  }
  async execute(command: NormalizeMerchantNameCommand): Promise<any> {
    const { transactions } = command;
    const prompt = normalizeTransactionPrompt(transactions);
    const reponse = await this.llm.complete(prompt);
    const arr = extractArray(reponse);
    return JSON.parse(arr);
  }
}
