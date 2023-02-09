import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  categoryId: number;
}

export class ProductUpdate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
