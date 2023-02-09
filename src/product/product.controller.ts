import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { product } from '@prisma/client';

import { ProductCreate, ProductFind, ProductUpdate } from './product.types';
import { ProductService } from './product.service';
import { FindOneParams } from '../app.types';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async getAll(@Body() where?: ProductFind): Promise<product[]> {
    return this.productService.getAll(where);
  }

  @Get(':id')
  async getOneById(@Param() params: FindOneParams) {
    const [res, err] = await this.productService.getOne({ id: +params.id });
    if (!res) throw err;
    return res;
  }
  @Get()
  async getOne(@Body() where: ProductFind): Promise<product> {
    const [res, err] = await this.productService.getOne(where);
    if (!res) throw err;
    return res;
  }

  @Post()
  async create(@Body() createEntity: ProductCreate): Promise<product> {
    return this.productService.create(createEntity);
  }

  @Delete('all')
  async delete(@Body() where?: ProductFind): Promise<{ count: number }> {
    return this.productService.delete(where);
  }

  @Delete()
  async deleteOne(@Body() where: ProductFind): Promise<product> {
    return this.productService.deleteOne(where);
  }

  @Patch('all')
  async update(
    @Body('data') updateProps: ProductUpdate,
    @Body('where') where?: ProductFind,
  ): Promise<{ count: number }> {
    return this.productService.update(updateProps, where);
  }

  @Patch()
  async updateOne(
    @Body('data') updateProps: ProductUpdate,
    @Body('where') where: ProductFind,
  ): Promise<product> {
    return this.productService.updateOne(updateProps, where);
  }
}
