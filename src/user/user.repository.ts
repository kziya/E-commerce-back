import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findOneById(id: number) {
    return this.prismaService.user.findFirst({ where: { id } });
  }
}
