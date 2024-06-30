import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaOptions: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: process.env.KAFKA_BROKERS.split(','), // Use the environment variable
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP,
      },
    },
  };

  app.connectMicroservice(kafkaOptions);
  await app.startAllMicroservices();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API for managing products')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
