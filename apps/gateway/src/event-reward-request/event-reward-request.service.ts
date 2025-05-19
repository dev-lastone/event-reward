import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RequestEventRewardDto } from '../../../event/src/event-reward-request/dto/request-event-reward.dto';

@Injectable()
export class EventRewardRequestService {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventMsaService: ClientProxy,
  ) {}

  async requestEventReward(requestEventRewardDto: RequestEventRewardDto) {
    // message?
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: 'request-event-reward',
        },
        requestEventRewardDto,
      ),
    );
  }

  async getEventRewardRequests(jwtPayload: any) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: 'get-event-reward-requests',
        },
        jwtPayload,
      ),
    );
  }
}
