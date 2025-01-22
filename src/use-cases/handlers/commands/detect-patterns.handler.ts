import { generatePatternDetectionPrompt } from '@core/consts/pattern-detection.prompt';
import { DetectPatternsCommand } from '@core/definitions/commands/detect-pattern.command';
import { extractArray } from '@core/shared/extract-array';
import { GenericService } from '@core/shared/generic-service';
import { GroqService } from '@frameworks/groq/groq.service';
import { CommandHandler, ICommandHandler } from 'cqrs-flow';

@CommandHandler(DetectPatternsCommand)
export class DetectPatternsCommandHandler
  extends GenericService
  implements ICommandHandler<DetectPatternsCommand>
{
  constructor(private readonly groq: GroqService) {
    super();
  }
  async execute(command: DetectPatternsCommand): Promise<any> {
    const { transactions } = command;
    const prompt = generatePatternDetectionPrompt(transactions);
    const reponse = await this.groq.complete(prompt);
    const arr = extractArray(reponse);
    return JSON.parse(arr);
  }
}
