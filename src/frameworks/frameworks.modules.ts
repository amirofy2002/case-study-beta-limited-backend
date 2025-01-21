import { Module } from '@nestjs/common';
import { GroqModule } from './groq/groq.module';

@Module({
  imports: [GroqModule],
  exports: [GroqModule],
})
export class FrameworksModules {}
