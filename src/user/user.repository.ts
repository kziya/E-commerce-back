import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { IUserCreate } from './user.types';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findOneById(id: number) {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  async create(user: IUserCreate): Promise<user | object> {
    return this.prismaService.user.create({
      data: user,
    });
  }
}
