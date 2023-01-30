import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  // for custom validation decorators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
