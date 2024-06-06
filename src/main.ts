import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { serve, setup } from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gestion Produits API')
    .setDescription('API pour la gestion des produits')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Serve swagger using swagger-ui-express
  const swaggerHtml = readFileSync(join(__dirname, '..', 'node_modules', 'swagger-ui-dist', 'index.html'), 'utf8')
    .replace('https://petstore.swagger.io/v2/swagger.json', '/swagger-docs-json');

  app.use('/api', serve, (req, res) => res.send(swaggerHtml));
  app.use('/swagger-docs-json', (req, res) => res.json(document));

  await app.listen(3000);
}
bootstrap();