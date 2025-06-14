import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm'; // Importa e executa a conexão com o banco

const app = express();

// Middlewares essenciais para a aplicação
app.use(cors());
app.use(express.json());

// Utiliza o arquivo principal de rotas
app.use(routes);

// Middleware do Celebrate para tratar erros de validação de forma automática
app.use(errors());

// Middleware global para tratamento de erros
app.use(
  (error: Error, _request: Request, response: Response, _next: NextFunction) => {
    // Se for um erro conhecido da nossa aplicação (criado por nós)
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    // Log do erro no console para o desenvolvedor
    console.error(error);

    // Se for um erro desconhecido/inesperado, retorna um erro 500 genérico
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

// Inicia o servidor na porta 3333
app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});