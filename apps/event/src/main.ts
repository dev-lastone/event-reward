import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetting } from 'common/util';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { validationPipeSetting } from 'common/util/validation-pipe.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validationPipeSetting(app);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: parseInt(process.env.TCP_PORT) || 3001,
    },
  });

  await app.startAllMicroservices();

  swaggerSetting(app, 'event');

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
