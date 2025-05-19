import { Controller, UseInterceptors } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtPayload } from 'common/type/jwt-payload';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { RpcInterceptor } from 'common/interceptor/rpc.interceptor';

@Controller('event-reward-requests')
export class EventRewardRequestController {
  constructor(
    private readonly eventRewardRequestService: EventRewardRequestService,
  ) {}

  @MessagePattern({
    cmd: MESSAGE_CMD.REQUEST_EVENT_REWARD,
  })
  @UseInterceptors(RpcInterceptor)
  async msgRequestEventReward(
    @Payload() requestEventRewardDto: RequestEventRewardDto,
  ) {
    return await this.eventRewardRequestService.requestEventReward(
      requestEventRewardDto,
    );
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_EVENT_REWARD_REQUESTS,
  })
  @UseInterceptors(RpcInterceptor)
  async msgGetEventRewardRequests(@Payload() jwtPayload: JwtPayload) {
    return await this.eventRewardRequestService.getEventRewardRequests(
      jwtPayload,
    );
  }
}
