import { Body, Controller, Post } from '@nestjs/common';
import { user } from '@prisma/client';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{
    user: Omit<user, 'password' | 'hash'>;
    accessToken: string;
    refreshToken: string;
  }> {
    const userPayload = await this.authService.getUserSignPayload(
      loginDto.email,
    );
    const tokens = this.authService.generateTokens(userPayload);

    return {
      user: userPayload,
      ...tokens,
    };
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return signUpDto;
  }
}
