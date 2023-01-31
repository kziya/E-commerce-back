import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import { RefreshTokenSignConfig } from '../configs/jwt.config';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}
  async getUserSignPayload(
    email: string,
  ): Promise<Omit<user, 'password' | 'hash'> | null> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) return null;
    const { password, hash, ...restUser } = user;
    return { ...restUser };
  }
  generateTokens(payload: Omit<user, 'password' | 'hash'>): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(
        payload,
        RefreshTokenSignConfig(this.configService),
      ),
    };
  }
}
