import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './configs/app-config.module';
import { FrameworksModules } from '@frameworks/frameworks.modules';
import Controllers from './controllers';
@Module({
  imports: [AppConfigModule, FrameworksModules],
  controllers: [AppController, ...Controllers],
  providers: [AppService],
})
export class AppModule {}
