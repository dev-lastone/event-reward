import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { validationPipeSetting } from 'common/setting/validation-pipe.setting';

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
}
bootstrap();
