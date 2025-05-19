import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { EventRewardRequestModule } from './event-reward-request/event-reward-request.module';
import { MSA_SERVICE } from 'common/const/msa-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_TCP_PORT: Joi.number().required(),
        EVENT_HOST: Joi.string().required(),
        EVENT_TCP_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: MSA_SERVICE.AUTH,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.getOrThrow('AUTH_HOST'),
              port: configService.getOrThrow('AUTH_TCP_PORT'),
            },
          }),
          inject: [ConfigService],
        },
      ],
      isGlobal: true,
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: MSA_SERVICE.EVENT,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.getOrThrow('EVENT_HOST'),
              port: configService.getOrThrow('EVENT_TCP_PORT'),
            },
          }),
          inject: [ConfigService],
        },
      ],
      isGlobal: true,
    }),

    AuthModule,
    EventModule,
    EventRewardRequestModule,
  ],
})
export class AppModule {}
