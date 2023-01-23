import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {AccessTokenConfig} from "../configs/jwt.config";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: AccessTokenConfig,
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
