import { LLM_KEYS } from '@core/consts/llm-keys.const';
import { generatePatternDetectionPrompt } from '@core/consts/pattern-detection.prompt';
import { DetectPatternsCommand } from '@core/definitions/commands/detect-pattern.command';
import { extractArray } from '@core/shared/extract-array';
import { GenericService } from '@core/shared/generic-service';
import { LLM } from '@core/types/llm.interface';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from 'cqrs-flow';

@CommandHandler(DetectPatternsCommand)
export class DetectPatternsCommandHandler
  extends GenericService
  implements ICommandHandler<DetectPatternsCommand>
{
  constructor(
    @Inject(LLM_KEYS.GROQ)
    private readonly llm: LLM,
  ) {
    super();
  }
  async execute(command: DetectPatternsCommand): Promise<any> {
    const { transactions } = command;
    const prompt = generatePatternDetectionPrompt(transactions);
    const reponse = await this.llm.complete(prompt);
    const arr = extractArray(reponse);
    return JSON.parse(arr);
  }
}
