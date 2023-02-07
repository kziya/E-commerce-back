import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { category } from '@prisma/client';

import { CategoryService } from './category.service';
import { FindOneParams } from '../app.types';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('all')
  async All(@Body() where?): Promise<category[]> {
    return this.categoryService.findAll(where);
  }

  @Get()
  async One(@Body() where): Promise<category> {
    const [category, httpError] = await this.categoryService.findOne(where);
    if (httpError) throw httpError;
    return category;
  }

  @Get(':id')
  async OneById(@Param() params: FindOneParams) {
    const [category, httpError] = await this.categoryService.findOne({
      id: Number(params.id),
    });

    if (httpError) throw httpError;
    return category;
  }
}
