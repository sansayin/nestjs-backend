import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { HttpExceptionFilter } from './http-exception';
import * as compression from 'compression'

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  logger.log("Start Server on port 3000");
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Nest Auth Service")
    .setVersion("v1.0")
    .setDescription("JWT Auth Service, trying to use Redis as backend")
    .build()
  const document  = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/api", app, document)
  app.use(compression())
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
