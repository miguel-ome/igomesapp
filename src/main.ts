import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/app.module';

// Import ambients variables
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite qualquer origem
    methods: 'GET, POST, PUT, DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
    credentials: true, // Permite o envio de cookies com a requisição (cuidado ao usar '*' com credenciais)
  });
  await app.listen(3000);
}
bootstrap();
