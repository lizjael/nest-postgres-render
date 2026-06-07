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

import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva categoría',
    description: 'Crea una nueva categoría en el sistema',
  })
  @ApiBody({
    type: CreateCategoriaDto,
    description: 'Datos necesarios para crear una categoría',
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  create(
    @Body()
    createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar categorías',
    description: 'Obtiene todas las categorías registradas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida correctamente',
  })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener categoría por ID',
    description: 'Obtiene una categoría específica mediante su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar categoría',
    description: 'Actualiza parcialmente una categoría existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateCategoriaDto,
    description: 'Datos necesarios para actualizar una categoría',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar categoría',
    description: 'Elimina una categoría del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.categoriasService.remove(id);
  }
}
