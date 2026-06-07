import { ApiProperty } from '@nestjs/swagger';

import {
  IsInt,
  IsString,
  IsPositive,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOrdenDto {
  @ApiProperty({
    example: 1,
    description: 'ID del cliente asociado a la orden',
  })
  @IsInt({ message: 'idCliente debe ser un número entero' })
  @IsPositive({ message: 'idCliente debe ser un número positivo' })
  idCliente: number;

  @ApiProperty({
    example: 'PENDIENTE',
    description: 'Estado actual de la orden',
  })
  @IsString({ message: 'estado debe ser un texto' })
  @MinLength(3)
  @MaxLength(50)
  estado: string;

  @ApiProperty({
    example: 250.75,
    description: 'Monto total de la orden',
  })
  @IsNumber()
  @Min(0)
  total: number;
}
