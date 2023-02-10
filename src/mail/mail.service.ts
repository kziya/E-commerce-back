import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { user } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationUrl(User: user) {
    return this.mailerService.sendMail({
      to: User.email,
      subject: 'Verify Your account',
      template: 'verify-account',
      context: {
        user: User,
      },
    });
  }
}
