import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {AccessTokenConfig} from "../configs/jwt.config";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: AccessTokenConfig,
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
