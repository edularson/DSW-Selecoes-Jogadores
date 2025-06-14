import { Request, Response } from 'express';
import CreateSelecaoService from '../services/CreateSelecaoService';
import ListSelecoesService from '../services/ListSelecoesService';
import ShowSelecaoService from '../services/ShowSelecaoService';
import UpdateSelecaoService from '../services/UpdateSelecaoService';
import DeleteSelecaoService from '../services/DeleteSelecaoService';

export default class SelecoesController {
  public async index(request: Request, response: Response): Promise<void> {
    const listSelecoes = new ListSelecoesService();
    const selecoes = await listSelecoes.execute();
    response.json(selecoes);
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const showSelecao = new ShowSelecaoService();
    const selecao = await showSelecao.execute({ id });
    response.json(selecao);
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { pais, tecnico, confederacao, ranking_fifa, titulos_copa } = request.body;
    const createSelecao = new CreateSelecaoService();
    const selecao = await createSelecao.execute({ pais, tecnico, confederacao, ranking_fifa, titulos_copa });
    response.status(201).json(selecao);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { pais, tecnico, confederacao, ranking_fifa, titulos_copa } = request.body;
    const updateSelecao = new UpdateSelecaoService();
    const selecao = await updateSelecao.execute({ id, pais, tecnico, confederacao, ranking_fifa, titulos_copa });
    response.json(selecao);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const deleteSelecao = new DeleteSelecaoService();
    await deleteSelecao.execute({ id });
    response.status(204).send();
  }
}