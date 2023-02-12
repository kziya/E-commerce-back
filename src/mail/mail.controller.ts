import { Controller, Post } from '@nestjs/common';

import { MailService } from './mail.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { SignedUserPayload } from '../auth/auth.types';
import { UserService } from '../user/user.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}
  @Post('account-verification')
  async sendVerifyMail(
    @GetUser() userPayload: SignedUserPayload,
  ): Promise<{ message: string }> {
    const user = await this.userService.findUser({ id: userPayload.id });
    const sendMail = await this.mailService.sendVerificationUrl(user);
    console.log(sendMail);
    return { message: 'ok' };
  }
}
