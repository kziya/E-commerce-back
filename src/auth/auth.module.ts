import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenConfig } from '../configs/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { UserModule } from '../user/user.module';
import { UserNotExistsValidator } from './validators/user-not-exists.validator';
import { UserExistsValidator } from './validators/user-exists.validator';
import { PasswordCheckValidator } from './validators/password-check.validator';

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
    BcryptModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    UserNotExistsValidator,
    UserExistsValidator,
    PasswordCheckValidator,
  ],
})
export class AuthModule {}
