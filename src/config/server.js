import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';

dotenv.config();

const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: true
    }
  });

  return server;
};

export default createServer;