import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { user, user_status } from '@prisma/client';

import { RefreshTokenSignConfig } from '../configs/jwt.config';
import { UserRepository } from '../user/user.repository';
import { UserCreateDto } from '../user/user.types';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { TokensResponse, UserPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}
  async getUserSignPayload(email: string): Promise<UserPayload | null> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) return null;
    const { password, hash, ...restUser } = user;
    return { ...restUser };
  }
  async activateAccount(id: number) {
    return this.userRepository.updateOne(
      { status: user_status.ACTIVE },
      { id },
    );
  }
  async findActivatingAccount(uuid: string) {
    return this.userRepository.findOne({ hash: uuid });
  }
  async addUser(userCreateDto: UserCreateDto): Promise<UserPayload> {
    const user = await this.userRepository.create({
      ...userCreateDto,
      password: await this.bcryptService.hash(userCreateDto.password),
    });

    const { password, hash, ...restUser } = user;
    return restUser;
  }
  generateTokens(payload: Omit<user, 'password' | 'hash'>): TokensResponse {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(
        payload,
        RefreshTokenSignConfig(this.configService),
      ),
    };
  }
  validateRefreshToken(refreshToken: string) {
    try {
      return this.jwtService.verify(
        refreshToken,
        RefreshTokenSignConfig(this.configService),
      );
    } catch (e) {
      return null;
    }
  }
  refreshAccessToken(payload: object) {
    return this.jwtService.sign(payload);
  }
}
