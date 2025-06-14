import { Request, Response } from 'express';
import CreateJogadorService from '../services/CreateJogadorService';
import ListJogadoresService from '../services/ListJogadoresService';
import ShowJogadorService from '../services/ShowJogadorService';
import UpdateJogadorService from '../services/UpdateJogadorService';
import DeleteJogadorService from '../services/DeleteJogadorService';

export default class JogadoresController {
  public async index(request: Request, response: Response): Promise<void> {
    const listJogadores = new ListJogadoresService();
    const jogadores = await listJogadores.execute();
    response.json(jogadores);
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const showJogador = new ShowJogadorService();
    const jogador = await showJogador.execute({ id });
    response.json(jogador);
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { nome, posicao, numero, clube, data_nascimento, selecao_id } = request.body;
    const createJogador = new CreateJogadorService();
    const jogador = await createJogador.execute({ nome, posicao, numero, clube, data_nascimento, selecao_id });
    response.status(201).json(jogador);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { nome, posicao, numero, clube, data_nascimento, selecao_id } = request.body;
    const updateJogador = new UpdateJogadorService();
    const jogador = await updateJogador.execute({ id, nome, posicao, numero, clube, data_nascimento, selecao_id });
    response.json(jogador);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const deleteJogador = new DeleteJogadorService();
    await deleteJogador.execute({ id });
    response.status(204).send();
  }
}