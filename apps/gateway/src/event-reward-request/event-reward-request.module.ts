import { Module } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';
import { EventRewardRequestController } from './event-reward-request.controller';

@Module({
  controllers: [EventRewardRequestController],
  providers: [EventRewardRequestService],
})
export class EventRewardRequestModule {}
