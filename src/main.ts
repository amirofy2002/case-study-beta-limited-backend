import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './configs/app-config.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
const apiGlobalPrefix = 'beta-api';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(apiGlobalPrefix, { exclude: ['health'] });
  app.enableCors();
  setupSwagger(app);
  const config = app.get(AppConfigService);
  const port = config.app.port;
  await app.listen(port);
  logger.log(`Application is running on port: ${port}`);
}
bootstrap();
