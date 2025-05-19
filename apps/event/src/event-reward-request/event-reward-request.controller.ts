import { Body, Controller, Post } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtPayload } from 'common/type/jwt-payload';

@Controller('event-reward-requests')
export class EventRewardRequestController {
  constructor(
    private readonly eventRewardRequestService: EventRewardRequestService,
  ) {}

  @Post()
  async requestEventReward(
    @Body() requestEventRewardDto: RequestEventRewardDto,
  ) {
    return await this.eventRewardRequestService.requestEventReward(
      requestEventRewardDto,
    );
  }

  @MessagePattern({
    cmd: 'request-event-reward',
  })
  async msgRequestEventReward(
    @Payload() requestEventRewardDto: RequestEventRewardDto,
  ) {
    return await this.eventRewardRequestService.requestEventReward(
      requestEventRewardDto,
    );
  }

  @MessagePattern({
    cmd: 'get-event-reward-requests',
  })
  async msgGetEventRewardRequests(@Payload() jwtPayload: JwtPayload) {
    return await this.eventRewardRequestService.getEventRewardRequests(
      jwtPayload,
    );
  }
}
