import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import Jogador from '../../../jogadores/typeorm/entities/Jogador';

@Entity('selecoes')
class Selecao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pais: string;

  @Column()
  tecnico: string;

  @Column()
  confederacao: string;

  @Column('int')
  ranking_fifa: number;

  @Column('int')
  titulos_copa: number;

  @OneToMany(() => Jogador, jogador => jogador.selecao)
  jogadores: Jogador[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Selecao;