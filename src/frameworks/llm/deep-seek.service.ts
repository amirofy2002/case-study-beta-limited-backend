import { AppConfigService } from '@configs/app-config.service';
import { GenericService } from '@core/shared/generic-service';
import { LLM } from '@core/types/llm.interface';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import OpenAI from 'openai';
@Injectable()
export class DeepSeekService
  extends GenericService
  implements LLM, OnApplicationBootstrap
{
  openai: OpenAI;
  constructor(private config: AppConfigService) {
    super();
  }
  onApplicationBootstrap() {
    const { apiKey, model } = this.config.deepseek;
    this.openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey,
    });
    this.logger.log({
      message: 'Deepseek client initialized',
      context: 'DeepSeekService',
      model,
    });
  }
  async complete(prompt: string) {
    const { model } = this.config.deepseek;
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: model,
    });
    return completion.choices[0].message.content;
  }
}
