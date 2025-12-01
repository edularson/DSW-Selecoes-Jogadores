import Jogador from '@modules/jogadores/typeorm/entities/Jogador';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('selecoes')
export default class Selecao {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  pais!: string;

  @Column()
  tecnico!: string;

  @Column()
  confederacao!: string;

  @Column('int')
  ranking_fifa!: number;

  @Column('int')
  titulos_copa!: number;

  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Jogador, jogador => jogador.selecao)
  jogadores!: Jogador[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}