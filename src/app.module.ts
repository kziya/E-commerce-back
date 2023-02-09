import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import envConfig from './configs/env.config';
import { JwtGuard } from './auth/guards/jwt.guard';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { CategoryModule } from './category/category.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception-filter';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    AuthModule,
    UserModule,
    PrismaModule,
    BcryptModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
