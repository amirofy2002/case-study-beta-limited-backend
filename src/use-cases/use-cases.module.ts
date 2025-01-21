import { Module } from '@nestjs/common';
import { ProcessTransactionModule } from './process-transctions/process-transction.module';
import { FrameworksModules } from '@frameworks/frameworks.modules';

@Module({
  imports: [FrameworksModules, ProcessTransactionModule],
  exports: [ProcessTransactionModule],
})
export class UseCasesModule {}
