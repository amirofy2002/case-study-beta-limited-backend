import { Module } from '@nestjs/common';
import { GroqService } from './groq.service';
import { LLM_KEYS } from '@core/consts/llm-keys.const';
import { DeepSeekService } from './deep-seek.service';

@Module({
  providers: [
    {
      provide: LLM_KEYS.GROQ,
      useClass: GroqService,
    },
    {
      provide: LLM_KEYS.DEEPSEEK,
      useClass: DeepSeekService,
    },
  ],
  exports: [
    {
      provide: LLM_KEYS.GROQ,
      useClass: GroqService,
    },
    {
      provide: LLM_KEYS.DEEPSEEK,
      useClass: DeepSeekService,
    },
  ],
})
export class LlmModule {}
