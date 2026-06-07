import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Orden } from './entities/orden.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto) {
    const cliente = await this.clienteRepository.findOneBy({
      idCliente: createOrdenDto.idCliente,
    });
    if (!cliente) {
      throw new BadRequestException(
        `Cliente con ID ${createOrdenDto.idCliente} no encontrado`,
      );
    }
    return this.ordenRepository.save({
      ...createOrdenDto,
      cliente: cliente,
    });
  }

  async findAll() {
    return this.ordenRepository.find();
  }

  async findOne(id: number) {
    const orden = await this.ordenRepository.findOneBy({ idOrden: id });
    if (!orden) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    const orden = await this.findOne(id);
    Object.assign(orden, updateOrdenDto);
    return this.ordenRepository.save(orden);
  }

  async remove(id: number) {
    const orden = await this.ordenRepository.findOneBy({ idOrden: id });
    if (!orden) throw new NotFoundException('Orden no encontrada');
    return await this.ordenRepository.softDelete(id);
  }
}
