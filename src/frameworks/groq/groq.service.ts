import { AppConfigService } from '@configs/app-config.service';
import { GenericService } from '@core/shared/generic-service';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Groq } from 'groq-sdk';
@Injectable()
export class GroqService
  extends GenericService
  implements OnApplicationBootstrap
{
  private client: Groq;
  constructor(private readonly config: AppConfigService) {
    super();
  }
  onApplicationBootstrap() {
    const { apiKey } = this.config.groq;
    if (!apiKey) throw new Error('Groq API key is required');
    this.client = new Groq({ apiKey });
    this.logger.log({
      message: 'Groq client initialized',
      context: 'GroqService',
    });
  }
}
