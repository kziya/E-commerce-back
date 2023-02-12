import {
  Body,
  Controller,
  Get,
  Headers,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { Public } from './decorators/public.decorator';
import { TokensResponse, UserPayloadResponse } from './auth.types';
import { MailService } from '../mail/mail.service';
import { UUIDParams } from '../app.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

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

    this.mailService.sendGreetingMail(userPayload);
    return {
      user: userPayload,
      ...tokens,
    };
  }

  @Public()
  @Get('refresh-token')
  async refreshToken(
    @Headers('refreshToken') refreshToken: string,
  ): Promise<TokensResponse & UserPayloadResponse> {
    const validationRes = this.authService.validateRefreshToken(refreshToken);

    if (!validationRes) throw new UnauthorizedException();

    const userPayload = await this.authService.getUserSignPayload(
      validationRes.email,
    );

    return {
      user: userPayload,
      accessToken: this.authService.refreshAccessToken(userPayload),
      refreshToken,
    };
  }

  @Public()
  @Redirect('https://google.com')
  @Get('verify/:uuid')
  async verifyAccount(@Param() params: UUIDParams) {
    const user = await this.authService.findActivatingAccount(params.uuid);
    if (!user) throw new NotFoundException();

    const activate = await this.authService.activateAccount(user.id);
    if (!activate) throw new InternalServerErrorException();
  }
}
