import { Module } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';
import { EventRewardRequestController } from './event-reward-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../event/entity/event.entity';
import {
  EventRewardRequest,
  EventRewardRequestSchema,
} from './entity/event-reward-request.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: EventRewardRequest.name,
        schema: EventRewardRequestSchema,
      },
    ]),
  ],
  controllers: [EventRewardRequestController],
  providers: [EventRewardRequestService],
})
export class EventRewardRequestModule {}
