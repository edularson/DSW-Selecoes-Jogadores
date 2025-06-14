import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import selecoesRouter from '@modules/selecoes/routes/selecoes.routes';
import jogadoresRouter from '@modules/jogadores/routes/jogadores.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter)
routes.use('/selecoes', selecoesRouter);
routes.use('/jogadores', jogadoresRouter);

export default routes;