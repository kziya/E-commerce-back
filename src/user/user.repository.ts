import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { IUserCreate } from './user.types';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: IUserCreate): Promise<user> {
    return this.prismaService.user.create({
      data: user,
    });
  }
  async findOneById(id: number) {
    return this.prismaService.user.findFirst({ where: { id } });
  }
  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
