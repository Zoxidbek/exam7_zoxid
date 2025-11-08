import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/all-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }));
  app.enableCors();
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('CRM system: Students API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(PORT, () => {
    console.log("CRM server running at: http://localhost:4001");
    console.log("Swagger documanatation: http://localhost:4001/api-docs");
  });
}
bootstrap();
