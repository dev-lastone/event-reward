import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetting } from 'common/util';
import { validationPipeSetting } from 'common/util/validation-pipe.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validationPipeSetting(app);

  swaggerSetting(app, 'gateway');

  await app.listen(3000);
}
bootstrap();
