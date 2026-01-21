import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';
import hbs from 'hbs';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  hbs.registerHelper('eq', (a, b) => a === b);
  hbs.registerHelper('inc', (value) => parseInt(value) + 1);
  hbs.registerHelper('json', (context) => JSON.stringify(context));

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
