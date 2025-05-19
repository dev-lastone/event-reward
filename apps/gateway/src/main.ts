import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetting } from 'libs/common/src/setting';
import { validationPipeSetting } from 'common/setting/validation-pipe.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validationPipeSetting(app);

  swaggerSetting(app, 'gateway');

  await app.listen(3000);
}
bootstrap();
