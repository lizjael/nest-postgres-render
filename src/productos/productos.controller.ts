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

import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Crea un nuevo producto asociado a una categoría',
  })
  @ApiBody({
    type: CreateProductoDto,
    description: 'Datos necesarios para crear un producto',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada',
  })
  create(
    @Body()
    createProductoDto: CreateProductoDto,
  ) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar productos',
    description: 'Obtiene todos los productos registrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente',
  })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener producto por ID',
    description: 'Obtiene un producto específico mediante su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar producto',
    description: 'Actualiza parcialmente un producto existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateProductoDto,
    description: 'Datos necesarios para actualizar un producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar producto',
    description: 'Elimina un producto del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productosService.remove(id);
  }
}
