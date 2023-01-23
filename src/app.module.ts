import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import envConfig from "./configs/env.config";

@Module({
  imports: [
      ConfigModule.forRoot(envConfig()),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
