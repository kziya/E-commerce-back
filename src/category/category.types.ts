import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryCreate {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CategoryUpdate {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CategoryFind {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;
}
