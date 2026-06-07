import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { OrdenProducto } from 'src/orden_producto/entities/orden_producto.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column()
  idCategoria: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  //
  @OneToMany(() => OrdenProducto, (ordenProducto) => ordenProducto.producto)
  ordenProductos: OrdenProducto[];
}
