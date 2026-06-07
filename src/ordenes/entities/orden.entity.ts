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
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { OrdenProducto } from 'src/orden_producto/entities/orden_producto.entity';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn()
  idOrden: number;

  @Column({ type: 'int' })
  idCliente: number;

  @Column({ length: 50 })
  estado: string;

  @Column()
  total: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  // Relación con Cliente (opcional pero recomendada)
  @ManyToOne(() => Cliente, (cliente) => cliente.idCliente)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  //
  @OneToMany(() => OrdenProducto, (ordenProducto) => ordenProducto.orden)
  ordenProductos: OrdenProducto[];
}
