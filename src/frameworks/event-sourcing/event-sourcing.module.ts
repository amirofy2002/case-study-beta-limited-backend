import { Module } from '@nestjs/common';
import { CommandBus, EventBus } from 'cqrs-flow';
@Module({
  imports: [EventBus, CommandBus],
  providers: [EventBus, CommandBus],
  exports: [EventBus, CommandBus],
})
export class EventSourcingModule {}
