import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import { RefreshTokenSignConfig } from '../configs/jwt.config';
import { UserRepository } from '../user/user.repository';
import { SignUpDto } from './dtos/sign-up.dto';
import { IUserCreate } from '../user/user.types';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
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

  async addUser(
    userCreateDto: IUserCreate,
  ): Promise<Omit<user, 'password' | 'hash'>> {
    const passwordHashed = await this.bcryptService.hash(
      userCreateDto.password,
    );

    const user = await this.userRepository.create({
      ...userCreateDto,
      password: passwordHashed,
    });
    const { password, hash, ...restUser } = user;
    return restUser;
  }
}
