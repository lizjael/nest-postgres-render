import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrdenProductoDto } from './dto/create-orden_producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden_producto.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdenProducto } from './entities/orden_producto.entity';
import { Orden } from 'src/ordenes/entities/orden.entity';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto)
    private readonly ordenProductoRepo: Repository<OrdenProducto>,
    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(createOrdenProductoDto: CreateOrdenProductoDto) {
    const orden = await this.ordenRepo.findOne({
      where: { idOrden: createOrdenProductoDto.idOrden },
    });
    if (!orden) throw new NotFoundException('Orden no encontrada');
    const producto = await this.productoRepo.findOne({
      where: { idProducto: createOrdenProductoDto.idProducto },
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    if (
      producto.stock === 0 ||
      producto.stock < createOrdenProductoDto.cantidad
    )
      throw new BadRequestException('Stock insuficiente');
    const ordenProd = this.ordenProductoRepo.create({
      idOrden: createOrdenProductoDto.idOrden,
      idProducto: createOrdenProductoDto.idProducto,
      cantidad: createOrdenProductoDto.cantidad,
      precio_unitario: producto.precio,
    });
    return await this.ordenProductoRepo.save(ordenProd);
  }

  async findAll() {
    return await this.ordenProductoRepo.find();
  }

  async findOne(id: number) {
    const ordenProducto = await this.ordenProductoRepo.findOne({
      where: { idOrdenProducto: id },
      relations: ['producto', 'orden'],
    });
    if (!ordenProducto)
      throw new NotFoundException('OrdenProducto no encontrada');
    return ordenProducto;
  }

  async update(id: number, updateOrdenProductoDto: UpdateOrdenProductoDto) {
    const ordenProducto = await this.findOne(id);
    if (!ordenProducto)
      throw new NotFoundException('OrdenProducto no encontrada');
    Object.assign(ordenProducto, updateOrdenProductoDto);
    return await this.ordenProductoRepo.save(ordenProducto);
  }

  async remove(id: number) {
    const ordenProducto = await this.findOne(id);
    if (!ordenProducto)
      throw new NotFoundException('OrdenProducto no encontrada');
    return await this.ordenProductoRepo.remove(ordenProducto);
  }

  async removeProducto(id: number, productId: number) {
    const item = await this.ordenProductoRepo.findOneBy({
      idOrden: id,
      idProducto: productId,
    });
    if (!item)
      throw new NotFoundException('Producto no encontrado en la orden');
    return await this.ordenProductoRepo.remove(item);
  }
}
