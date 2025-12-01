import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SelecoesController from '../controllers/SelecoesController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import SelecaoAvatarController from '../controllers/SelecaoAvatarController'; // Import novo

const selecoesRouter = Router();
const selecoesController = new SelecoesController();
const selecaoAvatarController = new SelecaoAvatarController(); // Instância nova
const upload = multer(uploadConfig);

selecoesRouter.use(isAuthenticated);

selecoesRouter.get('/', (request, response) => {
  return selecoesController.index(request, response);
 });
 
 
 selecoesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  (request, response) => {
    return selecoesController.show(request, response);
  }
 );
 
 
 selecoesRouter.post(
  '/',
  celebrate({
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
 
 
 selecoesRouter.put(
    '/:id',
    celebrate({
      [Segments.PARAMS]: { id: Joi.string().uuid().required() },
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
 
 
 selecoesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  (request, response) => {
    return selecoesController.delete(request, response);
  }
 );
 

selecoesRouter.patch(
  '/:id/avatar', // Rota com ID
  upload.single('avatar'),
  (request, response) => {
    return selecaoAvatarController.update(request, response);
  },
);

export default selecoesRouter;