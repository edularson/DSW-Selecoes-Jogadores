import Selecao from '@modules/selecoes/typeorm/entities/Selecao';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('jogadores')
export default class Jogador {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nome!: string;

  @Column()
  posicao!: string;

  @Column('int')
  numero!: number;

  @Column()
  clube!: string;

  @Column('date')
  data_nascimento!: Date;

  @Column({ nullable: true })
  avatar?: string;

  @ManyToOne(() => Selecao, selecao => selecao.jogadores)
  @JoinColumn({ name: 'selecao_id' })
  selecao!: Selecao;

  @Column()
  selecao_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}