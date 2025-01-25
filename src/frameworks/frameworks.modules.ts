import { Module } from '@nestjs/common';
import { LlmModule } from './llm/llm.module';
import { EventSourcingModule } from './event-sourcing/event-sourcing.module';

@Module({
  imports: [LlmModule, EventSourcingModule],
  exports: [LlmModule, EventSourcingModule],
})
export class FrameworksModules {}
