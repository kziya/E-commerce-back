import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {AccessTokenConfig} from "../configs/jwt.config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [
        ConfigModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: AccessTokenConfig,
        }),
      PrismaModule
    ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService]
})
export class AuthModule {}
