import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesModule } from './ordenes/ordenes.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { OrdenProductoModule } from './orden_producto/orden_producto.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
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

//   password: '123456',
//   database: 'db_crud',
//   autoLoadEntities: true,
//   synchronize: true,
//   extra: {
//     max: 20, // Máximo de conexiones en el pool
//     idleTimeoutMillis: 30000, // Tiempo de espera para cerrar conexiones inactivas
//   },
// }),
//     ClientesModule,
//     OrdenesModule,
//     ProductosModule,
//     CategoriasModule,
//     OrdenProductoModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}
