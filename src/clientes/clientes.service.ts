import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) //este cliente va a poder acceder a todos los metodos
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto); //crea una nueva instancia de cliente
    return await this.clienteRepository.save(cliente); //guarda el cliente en la base de datos
  }

  async findAll() {
    return await this.clienteRepository.find(); //devuelve todos los clientes
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ idCliente: id });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    const cliente = this.clienteRepository.findOneBy({ idCliente: id });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return this.clienteRepository.softDelete(id); //elimina un cliente por su id (soft delete)
    //return await this.clienteRepository.softRemove(cliente); //elimina por su instancia (soft delete)
  }
}
