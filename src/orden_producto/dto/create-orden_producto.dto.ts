import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreateOrdenProductoDto {
  @ApiProperty({
    example: 2,
    description: 'ID del producto asociado',
  })
  @IsNumber()
  @IsPositive()
  idProducto: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la orden asociada',
  })
  @IsNumber()
  @IsPositive()
  idOrden: number;

  @ApiProperty({
    example: 3,
    description: 'Cantidad del producto en la orden',
  })
  @IsNumber()
  @Min(1)
  cantidad: number;

  @ApiProperty({
    example: 120.5,
    description: 'Precio unitario del producto',
  })
  @IsNumber()
  @Min(0)
  precio_unitario: number;
}
