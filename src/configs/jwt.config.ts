import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const AccessTokenConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_ACCESS_EXPIRES'),
  },
});

export const RefreshTokenConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get('JWT_REFRESH_SECRET'),
  signOptions: {
    expiresIn: configService.get('JWT_REFRESH_EXPIRES'),
  },
});
