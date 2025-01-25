import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IAppVariables,
  IEnvironmentVariables,
  ILLMVariable,
} from 'src/core/types/env-variables.interface';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<IEnvironmentVariables>) {}

  get app(): IAppVariables {
    return this.configService.get('app', { infer: true });
  }

  get groq(): ILLMVariable {
    return this.configService.get('groq', { infer: true });
  }

  get deepseek(): ILLMVariable {
    return this.configService.get('deepseek', { infer: true });
  }
}
