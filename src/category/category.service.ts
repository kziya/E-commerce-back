import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { category } from '@prisma/client';

import { CategoryRepository } from './category.repository';
import { TupleRes } from '../app.types';

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
}
