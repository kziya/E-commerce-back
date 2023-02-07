import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { category } from '@prisma/client';

import { CategoryService } from './category.service';
import { FindOneParams } from '../app.types';
import { CategoryCreate, CategoryFind, CategoryUpdate } from './category.types';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('all')
  async All(@Body() where?: CategoryFind): Promise<category[]> {
    return this.categoryService.findAll(where);
  }

  @Get()
  async One(@Body() where: CategoryFind): Promise<category> {
    const [category, httpError] = await this.categoryService.findOne(where);
    if (httpError) throw httpError;
    return category;
  }

  @Get(':id')
  async OneById(@Param() params: FindOneParams): Promise<category> {
    const [category, httpError] = await this.categoryService.findOne({
      id: Number(params.id),
    });

    if (httpError) throw httpError;
    return category;
  }

  @Post()
  create(@Body() createEntity: CategoryCreate): Promise<category> {
    return this.categoryService.create(createEntity);
  }

  @Patch('all')
  updateAll(
    @Body('data') data: CategoryUpdate,
    @Body('where') where?: CategoryFind,
  ) {
    return this.categoryService.updateAll(data, where);
  }

  @Patch()
  update(
    @Body('data') data: CategoryUpdate,
    @Body('where') where: CategoryFind,
  ) {
    return this.categoryService.updateOne(data, where);
  }
}
