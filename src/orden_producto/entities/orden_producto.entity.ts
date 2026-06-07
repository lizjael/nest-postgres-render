import { Orden } from 'src/ordenes/entities/orden.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrdenProducto {
  @PrimaryGeneratedColumn()
  idOrdenProducto: number;

  @Column()
  idProducto: number;

  @Column()
  idOrden: number;

  @Column()
  cantidad: number;

  @Column()
  precio_unitario: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Orden, (orden) => orden.ordenProductos)
  @JoinColumn({ name: 'idOrden' })
  orden: Orden;

  @ManyToOne(() => Producto, (producto) => producto.ordenProductos)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}
