import { Body, Delete, Injectable } from '@nestjs/common';
import { product } from '@prisma/client';

import { ProductCreate, ProductFind, ProductUpdate } from './product.types';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async getAll(where?: ProductFind): Promise<product[]> {
    return this.productRepository.findAll(where);
  }
  async getOne(where: ProductFind): Promise<product> {
    return this.productRepository.findOne(where);
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
