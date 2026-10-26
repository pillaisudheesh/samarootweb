import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    rawBody: false,
  });

  app.use(express.json({ limit: '16kb' }));
  app.use(express.urlencoded({ extended: false, limit: '16kb' }));

  const config = app.get(ConfigService);

  const isProduction = config.get<string>('NODE_ENV') === 'production';

  const frontendOrigin = config.get<string>('FRONTEND_ORIGIN');

  if (isProduction && !frontendOrigin) {
    throw new Error('FRONTEND_ORIGIN must be configured in production.');
  }

  const allowedOrigin = frontendOrigin ?? 'http://localhost:3010';

  app.use(helmet());

  app.enableCors({
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (!isProduction) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('SamaRoot Marketing API')
      .setDescription(
        'API for the SamaRoot marketing website, including public enquiries.',
      )
      .setVersion('1.0.0')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api/docs', app, swaggerDocument, {
      customSiteTitle: 'SamaRoot API Documentation',
    });
  }

  const port = config.get<number>('PORT') ?? 4000;

  await app.listen(port);

  console.log(`SamaRoot marketing API listening on port ${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api/docs`);
}

bootstrap();
