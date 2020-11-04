import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from './config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: '*'})
  const options = new DocumentBuilder()
    .setTitle(config.swaggerApiTitle)
    .setDescription(config.swaggerApiDescription)
    .setVersion('1.0')
    .addTag(config.swaggerApiTitle)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
