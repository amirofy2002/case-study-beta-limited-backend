import { Module } from '@nestjs/common';
import { ProcessTransactionUsecase } from './prcess-transcation.usecase';
import { GroqModule } from '@frameworks/groq/groq.module';

@Module({
  imports: [GroqModule],
  providers: [ProcessTransactionUsecase],
  exports: [ProcessTransactionUsecase],
})
export class ProcessTransactionModule {}
