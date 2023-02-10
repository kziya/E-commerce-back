import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import mailerConfig from '../configs/mailer.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mailerConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
