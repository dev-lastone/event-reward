import { Controller } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';

@Controller('event-reward-request')
export class EventRewardRequestController {
  constructor(private readonly eventRewardRequestService: EventRewardRequestService) {}
}
