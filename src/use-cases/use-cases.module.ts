import { Module } from '@nestjs/common';
import { ProcessTransactionModule } from './process-transctions/process-transction.module';
import { FrameworksModules } from '@frameworks/frameworks.modules';
import CommandHandlers from './handlers/commands';
@Module({
  imports: [FrameworksModules, ProcessTransactionModule],
  exports: [ProcessTransactionModule],
  providers: [...CommandHandlers],
})
export class UseCasesModule {}
