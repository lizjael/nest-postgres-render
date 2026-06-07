import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria) //este cliente va a poder acceder a todos los metodos
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.categoriaRepository.create(createCategoriaDto); //crea una nueva instancia de cliente
    return this.categoriaRepository.save(categoria); //guarda el cliente en la base de datos
  }

  async findAll() {
    return await this.categoriaRepository.find(); //devuelve todos los clientes
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({
      where: { idCategoria: id },
    });
    if (!categoria) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({
      idCategoria: id,
    });
    if (!categoria) {
      throw new NotFoundException('Categoria no encontrada');
    }

    return await this.categoriaRepository.softDelete(id);
  }
}
