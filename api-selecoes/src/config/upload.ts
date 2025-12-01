import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Define a pasta onde os arquivos serão salvos
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  // O diretório onde os arquivos estão
  directory: uploadFolder,

  // Configuração de armazenamento do Multer
  storage: multer.diskStorage({
    // Destino do arquivo
    destination: uploadFolder,
    // Define o nome do arquivo
    filename(request, file, callback) {
      // Gera um hash aleatório para garantir um nome de arquivo único
      const fileHash = crypto.randomBytes(10).toString('hex');
      
      // Cria o nome final: HASH-nomeoriginal.ext
      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};