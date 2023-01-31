import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { Public } from './decorators/public.decorator';
import { TokensResponse, UserPayloadResponse } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<UserPayloadResponse & TokensResponse> {
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
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<UserPayloadResponse & TokensResponse> {
    const { confirmPassword, ...restDto } = signUpDto;
    const userPayload = await this.authService.addUser(restDto);
    const tokens = this.authService.generateTokens(userPayload);
    return {
      user: userPayload,
      ...tokens,
    };
  }

  @Get('refresh-token')
  refreshToken(): TokensResponse {
    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}
