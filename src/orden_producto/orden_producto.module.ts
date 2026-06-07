import { Module } from '@nestjs/common';
import { OrdenProductoService } from './orden_producto.service';
import { OrdenProductoController } from './orden_producto.controller';
import { Orden } from 'src/ordenes/entities/orden.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { OrdenProducto } from './entities/orden_producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenProducto, Orden, Producto])],
  controllers: [OrdenProductoController],
  providers: [OrdenProductoService],
})
export class OrdenProductoModule {}
