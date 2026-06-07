import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { OrdenProductoModule } from './orden_producto/orden_producto.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        max: 20, // Máximo de conexiones en el pool
        idleTimeoutMillis: 30000, // Tiempo de espera para cerrar conexiones inactivas
      },
    }),
    ClientesModule,
    OrdenesModule,
    ProductosModule,
    CategoriasModule,
    OrdenProductoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
