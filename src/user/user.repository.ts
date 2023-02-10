import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto, UserUpdateDto } from './user.types';
import { IAppRepository } from '../app.types';

@Injectable()
export class UserRepository
  implements IAppRepository<user, UserCreateDto, UserUpdateDto>
{
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: UserCreateDto): Promise<user> {
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

  async delete(where?: Partial<user>): Promise<{ count: number }> {
    return where
      ? this.prismaService.user.deleteMany({ where })
      : this.prismaService.user.deleteMany();
  }

  deleteOne(where: Partial<user>): Promise<user> {
    return this.prismaService.user.delete({ where });
  }

  findAll(where: Partial<user>): Promise<user[]> {
    return where
      ? this.prismaService.user.findMany({ where })
      : this.prismaService.user.findMany();
  }

  findOne(where: Partial<user>): Promise<user> {
    return this.prismaService.user.findFirst({ where });
  }

  update(
    updateProps: UserUpdateDto,
    where?: Partial<user>,
  ): Promise<{ count: number }> {
    return where
      ? this.prismaService.user.updateMany({ data: updateProps, where })
      : this.prismaService.user.updateMany({ data: updateProps });
  }

  updateOne(updateProps: UserUpdateDto, where: Partial<user>): Promise<user> {
    return this.prismaService.user.update({ data: updateProps, where });
  }
}
