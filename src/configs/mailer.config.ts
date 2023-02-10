import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
export default (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.get('MAILER_HOST'),
    port: +configService.get('MAILER_PORT'),
    secure: Boolean(configService.get('MAILER_IS_SECURE')),
    auth: {
      user: configService.get('MAILER_USER'),
      pass: configService.get('MAILER_PASS'),
    },
  },
  defaults: {
    from: `${configService.get('MAILER_DEFAULT_NAME')} ${configService.get(
      'MAILER_USER',
    )}`,
    replyTo: configService.get('MAILER_DEFAULT_REPLY_TO'),
  },
  template: {
    dir: resolve(process.cwd(), 'views', 'mail'),
    adapter: new EjsAdapter(),
  },
});
