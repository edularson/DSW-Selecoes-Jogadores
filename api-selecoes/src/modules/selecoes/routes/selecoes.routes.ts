import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SelecoesController from '../controllers/SelecoesController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const selecoesRouter = Router();
const selecoesController = new SelecoesController();

// Aplica autenticação para todas as rotas de Seleção
selecoesRouter.use(isAuthenticated);

// Rota para listar todas as seleções
selecoesRouter.get('/', (request, response) => {
  return selecoesController.index(request, response);
});

// Rota para ver uma seleção específica pelo ID
selecoesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  (request, response) => {
    return selecoesController.show(request, response);
  }
);

// Rota para criar uma nova seleção
selecoesRouter.post(
  '/',
  celebrate({
    // AQUI ESTÁ A VALIDAÇÃO COMPLETA QUE FALTAVA
    [Segments.BODY]: {
      pais: Joi.string().required(),
      tecnico: Joi.string().required(),
      confederacao: Joi.string().required(),
      ranking_fifa: Joi.number().required(),
      titulos_copa: Joi.number().required(),
    },
  }),
  (request, response) => {
    return selecoesController.create(request, response);
  }
);

// Rota para atualizar uma seleção
selecoesRouter.put(
    '/:id',
    celebrate({
      [Segments.PARAMS]: { id: Joi.string().uuid().required() },
      // AQUI ESTÁ A CORREÇÃO:
      [Segments.BODY]: Joi.object({
        pais: Joi.string().required(),
        tecnico: Joi.string().required(),
        confederacao: Joi.string().required(),
        ranking_fifa: Joi.number().required(),
        titulos_copa: Joi.number().required(),
      }).unknown(),
    }),
    (request, response) => {
      return selecoesController.update(request, response);
    }
  );

// Rota para deletar uma seleção
selecoesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  (request, response) => {
    return selecoesController.delete(request, response);
  }
);

export default selecoesRouter;