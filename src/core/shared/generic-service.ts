import { Logger } from '@nestjs/common';

export abstract class GenericService {
  logger = new Logger(this.constructor.name);
}
