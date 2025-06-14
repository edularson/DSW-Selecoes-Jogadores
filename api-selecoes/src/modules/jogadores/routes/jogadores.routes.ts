import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import JogadoresController from '../controllers/JogadoresController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const jogadoresRouter = Router();
const jogadoresController = new JogadoresController();

jogadoresRouter.use(isAuthenticated);

jogadoresRouter.get('/', (request, response) => {
  return jogadoresController.index(request, response);
});

jogadoresRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (request, response) => {
    return jogadoresController.show(request, response);
  }
);

jogadoresRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      posicao: Joi.string().required(),
      numero: Joi.number().required(),
      clube: Joi.string().required(),
      data_nascimento: Joi.date().required(),
      selecao_id: Joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return jogadoresController.create(request, response);
  }
);

jogadoresRouter.put(
    '/:id',
    celebrate({
      [Segments.PARAMS]: { id: Joi.string().uuid().required() },
      [Segments.BODY]: Joi.object({
        nome: Joi.string().required(),
        posicao: Joi.string().required(),
        numero: Joi.number().required(),
        clube: Joi.string().required(),
        data_nascimento: Joi.date().required(),
        selecao_id: Joi.string().uuid().required(),
      }).unknown(),
    }),
    (request, response) => {
      return jogadoresController.update(request, response);
    }
  );

jogadoresRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  (request, response) => {
    return jogadoresController.delete(request, response);
  }
);

export default jogadoresRouter;