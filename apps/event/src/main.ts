import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetting } from 'common/common/util/swagger.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerSetting(app, 'event');

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
