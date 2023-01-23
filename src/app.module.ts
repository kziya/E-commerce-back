import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import envConfig from "./configs/env.config";
import {JwtGuard} from "./auth/guards/jwt.guard";

@Module({
  imports: [
      ConfigModule.forRoot(envConfig()),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
      {
      provide: APP_GUARD,
      useClass: JwtGuard,
      }
  ],
})
export class AppModule {}
