import {
  JwtModuleOptions,
  JwtSignOptions,
  JwtVerifyOptions,
} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const AccessTokenModuleConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_ACCESS_EXPIRES'),
  },
});

export const RefreshTokenSignConfig = (
  configService: ConfigService,
): JwtVerifyOptions & JwtSignOptions => ({
  secret: configService.get('JWT_REFRESH_SECRET'),
  expiresIn: configService.get('JWT_REFRESH_EXPIRES'),
});
