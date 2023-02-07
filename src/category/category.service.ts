import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { category } from '@prisma/client';

import { CategoryRepository } from './category.repository';
import { TupleRes } from '../app.types';
import { CategoryCreate, CategoryFind, CategoryUpdate } from './category.types';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(where?: Partial<category>): Promise<category[]> {
    return this.categoryRepository.findAll(where);
  }

  async findOne(
    where: Partial<category>,
  ): Promise<TupleRes<category, HttpException>> {
    const category = await this.categoryRepository.findOne(where);
    if (!category) return [null, new NotFoundException()];
    return [category, null];
  }

  async create(createEntity: CategoryCreate): Promise<category> {
    return this.categoryRepository.create(createEntity);
  }

  async updateAll(data: CategoryUpdate, where?: CategoryFind) {
    return this.categoryRepository.update(data, where);
  }

  async updateOne(data: CategoryUpdate, where: CategoryFind) {
    return this.categoryRepository.updateOne(data, where);
  }

  async deleteAll(where?: CategoryFind) {
    return this.categoryRepository.delete(where);
  }

  async deleteOne(where: CategoryFind) {
    return this.categoryRepository.delete(where);
  }
}
