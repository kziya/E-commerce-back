import { Injectable } from '@nestjs/common';
import { category } from '@prisma/client';

import { CategoryCreate, CategoryUpdate } from './category.types';
import { PrismaService } from '../prisma/prisma.service';
import { IAppRepository } from '../app.types';

@Injectable()
export class CategoryRepository
  implements IAppRepository<category, CategoryCreate, CategoryUpdate>
{
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEntity: CategoryCreate): Promise<category> {
    return this.prismaService.category.create({ data: createEntity });
  }

  async delete(where?: Partial<category>): Promise<any> {
    return where
      ? this.prismaService.category.deleteMany({ where })
      : this.prismaService.category.deleteMany({});
  }

  async deleteOne(where: Partial<category>): Promise<any> {
    return this.prismaService.user.delete({ where });
  }

  async findAll(where?: Partial<category>): Promise<category[]> {
    return where
      ? this.prismaService.category.findMany({ where })
      : this.prismaService.category.findMany();
  }

  async findOne(where: Partial<category>): Promise<category> {
    return this.prismaService.category.findFirst({ where });
  }

  async findOneById(id: number): Promise<category> {
    return this.findOne({ id });
  }

  async update(
    updateProps: CategoryUpdate,
    where?: Partial<category>,
  ): Promise<any> {
    return where
      ? this.prismaService.category.updateMany({
          data: updateProps,
          where,
        })
      : this.prismaService.category.updateMany({
          data: updateProps,
        });
  }

  async updateOne(
    updateProps: CategoryUpdate,
    where: Partial<category>,
  ): Promise<category> {
    return this.prismaService.category.update({ data: updateProps, where });
  }
}
