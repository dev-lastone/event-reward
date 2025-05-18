import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { EventRewardRequestModule } from './event-reward-request/event-reward-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_DB_EVENT_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGO_DB_EVENT_URL'),
      }),
      inject: [ConfigService],
    }),

    EventModule,
    EventRewardRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
