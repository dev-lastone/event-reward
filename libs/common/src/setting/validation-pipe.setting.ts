import { INestApplication, ValidationPipe } from '@nestjs/common';

export function validationPipeSetting(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
}
