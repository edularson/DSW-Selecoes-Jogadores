import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Selecao from '../../../selecoes/typeorm/entities/Selecao';

@Entity('jogadores')
class Jogador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  posicao: string;

  @Column('int')
  numero: number;

  @Column()
  clube: string;

  @Column('date')
  data_nascimento: Date;

  @ManyToOne(() => Selecao, selecao => selecao.jogadores)
  @JoinColumn({ name: 'selecao_id' })
  selecao: Selecao;

  @Column()
  selecao_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Jogador;