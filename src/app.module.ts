import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './configs/app-config.module';
import { FrameworksModules } from '@frameworks/frameworks.modules';
import Controllers from './controllers';
import { UseCasesModule } from '@use-cases/use-cases.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@frameworks/global-filter/global.filter';
@Module({
  imports: [AppConfigModule, FrameworksModules, UseCasesModule],
  controllers: [AppController, ...Controllers],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
