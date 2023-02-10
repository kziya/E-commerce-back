import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { product } from '@prisma/client';

import { ProductCreate, ProductFind, ProductUpdate } from './product.types';
import { ProductRepository } from './product.repository';
import { TupleRes } from '../app.types';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async getAll(where?: ProductFind): Promise<product[]> {
    return this.productRepository.findAll(where);
  }
  async getOne(where: ProductFind): Promise<TupleRes<product, HttpException>> {
    const res = await this.productRepository.findOne(where);
    if (!res) return [null, new NotFoundException()];
    return [res, null];
  }

  async create(createEntity: ProductCreate): Promise<product> {
    return this.productRepository.create(createEntity);
  }

  async delete(where?: ProductFind): Promise<{ count: number }> {
    return this.productRepository.delete(where);
  }

  async deleteOne(where: ProductFind): Promise<product> {
    return this.productRepository.deleteOne(where);
  }

  async update(
    productUpdate: ProductUpdate,
    where?: ProductFind,
  ): Promise<{ count: number }> {
    return this.productRepository.update(productUpdate, where);
  }

  async updateOne(
    productUpdate: ProductUpdate,
    where: ProductFind,
  ): Promise<product> {
    return this.productRepository.updateOne(productUpdate, where);
  }
}
