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

import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('ordenes')
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva orden',
    description: 'Crea una nueva orden asociada a un cliente',
  })
  @ApiBody({
    type: CreateOrdenDto,
    description: 'Datos necesarios para crear una orden',
  })
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  create(
    @Body()
    createOrdenDto: CreateOrdenDto,
  ) {
    return this.ordenesService.create(createOrdenDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar órdenes',
    description: 'Obtiene todas las órdenes registradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de órdenes obtenida correctamente',
  })
  findAll() {
    return this.ordenesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener orden por ID',
    description: 'Obtiene una orden específica mediante su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Orden encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar orden',
    description: 'Actualiza parcialmente una orden existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateOrdenDto,
    description: 'Datos necesarios para actualizar una orden',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden actualizada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateOrdenDto: UpdateOrdenDto,
  ) {
    return this.ordenesService.update(id, updateOrdenDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar orden',
    description: 'Elimina una orden del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la orden',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Orden eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.ordenesService.remove(id);
  }
}
