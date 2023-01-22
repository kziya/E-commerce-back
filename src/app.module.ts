import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { AppService } from './app.service';
import { AppController } from './app.controller';
import envConfig from "./configs/env.config";

@Module({
  imports: [
      ConfigModule.forRoot(envConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}