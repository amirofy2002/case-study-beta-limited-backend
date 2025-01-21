import { Module } from '@nestjs/common';
import { GroqModule } from './groq/groq.module';
import { EventSourcingModule } from './event-sourcing/event-sourcing.module';

@Module({
  imports: [GroqModule, EventSourcingModule],
  exports: [GroqModule, EventSourcingModule],
})
export class FrameworksModules {}
