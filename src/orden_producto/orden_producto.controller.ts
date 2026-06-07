import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { OrdenProductoService } from './orden_producto.service';
import { CreateOrdenProductoDto } from './dto/create-orden_producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden_producto.dto';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('orden-producto')
@Controller('orden-producto')
export class OrdenProductoController {
  constructor(private readonly ordenProductoService: OrdenProductoService) {}

  @Post()
  @ApiOperation({
    summary: 'Agregar producto a una orden',
    description:
      'Asocia un producto a una orden indicando cantidad y precio unitario',
  })
  @ApiBody({
    type: CreateOrdenProductoDto,
    description: 'Datos necesarios para agregar un producto a una orden',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto agregado a la orden correctamente',
    schema: {
      example: {
        idOrdenProducto: 1,
        idProducto: 2,
        idOrden: 1,
        cantidad: 3,
        precio_unitario: 120.5,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden o producto no encontrado',
  })
  create(
    @Body()
    createOrdenProductoDto: CreateOrdenProductoDto,
  ) {
    return this.ordenProductoService.create(createOrdenProductoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar relaciones orden-producto',
    description: 'Obtiene todos los productos asociados a órdenes',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de relaciones orden-producto obtenida correctamente',
  })
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener relación orden-producto por ID',
    description:
      'Obtiene una relación específica entre una orden y un producto',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación orden-producto',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Relación encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación no encontrada',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenProductoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar relación orden-producto',
    description: 'Actualiza parcialmente una relación entre orden y producto',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación orden-producto',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateOrdenProductoDto,
    description: 'Datos necesarios para actualizar la relación orden-producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Relación actualizada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación no encontrada',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateOrdenProductoDto: UpdateOrdenProductoDto,
  ) {
    return this.ordenProductoService.update(id, updateOrdenProductoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar relación orden-producto',
    description: 'Elimina una relación entre una orden y un producto',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación orden-producto',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Relación eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación no encontrada',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenProductoService.remove(id);
  }
}
