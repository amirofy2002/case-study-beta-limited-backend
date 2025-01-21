import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const orgConfig = new DocumentBuilder()
    .setTitle('beta api related documents')
    .setDescription('the API description')
    .setVersion('1.0')
    .addTag('beta-api')
    .addBearerAuth()
    .build();
  const orgDocumentFactory = () => SwaggerModule.createDocument(app, orgConfig);

  SwaggerModule.setup('api/documents', app, orgDocumentFactory);
};
