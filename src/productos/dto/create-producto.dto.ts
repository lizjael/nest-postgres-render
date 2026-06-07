import { ApiProperty } from '@nestjs/swagger';

import {
  IsNumber,
  IsString,
  IsPositive,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la categoría asociada al producto',
  })
  @IsNumber()
  @IsPositive()
  idCategoria: number;

  @ApiProperty({
    example: 'Laptop Lenovo',
    description: 'Nombre del producto',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    example: 'Laptop Lenovo Core i7 16GB RAM',
    description: 'Descripción detallada del producto',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  descripcion: string;

  @ApiProperty({
    example: 3500.99,
    description: 'Precio del producto',
  })
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty({
    example: 15,
    description: 'Cantidad disponible en stock',
  })
  @IsNumber()
  @Min(0)
  stock: number;
}
