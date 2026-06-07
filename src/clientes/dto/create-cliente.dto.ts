import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    example: 'Liz',
    description: 'Nombres del cliente',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombres: string;

  @ApiProperty({
    example: 'Nacho',
    description: 'Apellido paterno del cliente',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  paterno: string;

  @ApiProperty({
    example: 'Apaza',
    description: 'Apellido materno del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  materno?: string;

  @ApiProperty({
    example: 'liz@gmail.com',
    description: 'Correo electrónico único del cliente',
  })
  @IsEmail()
  email: string;
}
