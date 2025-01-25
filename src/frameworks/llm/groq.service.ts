import { AppConfigService } from '@configs/app-config.service';
import { GenericService } from '@core/shared/generic-service';
import { LLM } from '@core/types/llm.interface';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Groq } from 'groq-sdk';
@Injectable()
export class GroqService
  extends GenericService
  implements OnApplicationBootstrap, LLM
{
  private client: Groq;
  constructor(private readonly config: AppConfigService) {
    super();
  }
  onApplicationBootstrap() {
    const { apiKey, model } = this.config.groq;
    if (!apiKey) throw new Error('Groq API key is required');
    this.client = new Groq({ apiKey });
    this.logger.log({
      message: 'Groq client initialized',
      context: 'GroqService',
      model,
    });
  }

  complete(prompt: string) {
    const { model } = this.config.groq;
    return this.client.chat.completions
      .create({
        model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stop: null,
      })
      .then((res) => {
        this.logger.debug({
          message: 'Groq completion response',
          context: 'GroqService',
          response: res,
        });
        return res.choices?.[0]?.message.content;
      })
      .catch((err) => {
        this.logger.error({ error: err, context: 'GroqService' });
        throw new Error('Failed to complete prompt');
      });
  }
}
