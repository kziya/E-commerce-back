import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { category } from '@prisma/client';

import { CategoryService } from './category.service';
import { FindOneParams } from '../app.types';
import { CategoryCreate, CategoryFind, CategoryUpdate } from './category.types';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { SignedUserPayload } from '../auth/auth.types';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('all')
  async All(
    @GetUser() user: SignedUserPayload,
    @Body() where?: CategoryFind,
  ): Promise<category[]> {
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
      id: +params.id,
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

  @Delete('all')
  deleteAll(@Body() where?: CategoryFind) {
    return this.categoryService.deleteAll(where);
  }

  @Delete()
  delete(@Body() where: CategoryFind) {
    return this.categoryService.deleteOne(where);
  }
}
