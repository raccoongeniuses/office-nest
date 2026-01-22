import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';
import { AuthExceptionFilter } from '../src/filters/auth-exception.filter';

export default async function handler(req, res) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Helper registration (copied from main.ts)
  hbs.registerHelper('eq', (a, b) => a === b);
  hbs.registerHelper('inc', (value) => parseInt(value) + 1);
  hbs.registerHelper('json', (context) => JSON.stringify(context));
  hbs.registerHelper('formatCurrency', (value) => {
    if (typeof value === 'undefined' || value === null) return '0,00';
    const num = Number(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AuthExceptionFilter());

  // Path configuration for Vercel environment
  app.useStaticAssets(join(process.cwd(), 'dist', 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'dist', 'views'));
  app.setViewEngine('hbs');

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}
