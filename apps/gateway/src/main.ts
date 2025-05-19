import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetting } from 'common/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerSetting(app, 'gateway');

  await app.listen(3000);
}
bootstrap();
