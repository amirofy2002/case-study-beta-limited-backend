import { Module } from '@nestjs/common';
import { ProcessTransactionUsecase } from './prcess-transcation.usecase';
import { FrameworksModules } from '@frameworks/frameworks.modules';

@Module({
  imports: [FrameworksModules],
  providers: [ProcessTransactionUsecase],
  exports: [ProcessTransactionUsecase],
})
export class ProcessTransactionModule {}
