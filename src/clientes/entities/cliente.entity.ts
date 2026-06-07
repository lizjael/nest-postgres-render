import { Orden } from 'src/ordenes/entities/orden.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 50 })
  paterno: string;

  @Column({ length: 50 })
  materno: string;

  @Column({ length: 100, unique: true })
  email: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Orden, (orden) => orden.cliente)
  ordenes: Orden[];
}
