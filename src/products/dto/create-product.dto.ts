import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: 'The description of the product', required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: 'The category of the product', required: false })
  @IsString()
  @IsOptional()
  readonly category?: string;

  @ApiProperty({ description: 'The stock of the product', required: false })
  @IsNumber()
  @IsOptional()
  readonly stock?: number;
}