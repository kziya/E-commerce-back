import { Injectable } from '@nestjs/common';
import { product } from '@prisma/client';

import { IAppRepository } from '../app.types';
import { ProductCreate, ProductUpdate } from './product.types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductRepository
  implements IAppRepository<product, ProductCreate, ProductUpdate>
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEntity: ProductCreate): Promise<product> {
    return this.prismaService.product.create({ data: createEntity });
  }

  async delete(where: Partial<product>): Promise<{ count: number }> {
    return where
      ? this.prismaService.product.deleteMany({ where })
      : this.prismaService.product.deleteMany();
  }

  async deleteOne(where: Partial<product>): Promise<product> {
    return this.prismaService.product.delete({ where });
  }

  async findAll(where?: Partial<product>): Promise<product[]> {
    return where
      ? this.prismaService.product.findMany({ where })
      : this.prismaService.product.findMany();
  }

  async findOne(where: Partial<product>): Promise<product> {
    return this.prismaService.product.findFirst({ where });
  }

  async findOneById(id: number): Promise<product> {
    return this.findOne({ id });
  }

  async update(
    updateProps: ProductUpdate,
    where?: Partial<product>,
  ): Promise<{ count: number }> {
    return where
      ? this.prismaService.product.updateMany({ data: updateProps, where })
      : this.prismaService.product.updateMany({ data: updateProps });
  }

  async updateOne(
    updateProps: ProductUpdate,
    where: Partial<product>,
  ): Promise<product> {
    return this.prismaService.product.update({ data: updateProps, where });
  }
}
