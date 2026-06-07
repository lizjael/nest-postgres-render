import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { Orden } from './entities/orden.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, Cliente])],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}
