import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';
import { JwtPayload } from 'common/type/jwt-payload';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';

@Injectable()
export class EventRewardRequestService {
  constructor(
    @Inject(MSA_SERVICE.EVENT)
    private readonly eventMsaService: ClientProxy,
  ) {}

  async requestEventReward(
    userId: string,
    requestEventRewardDto: RequestEventRewardDto,
  ) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: MESSAGE_CMD.REQUEST_EVENT_REWARD,
        },
        { ...requestEventRewardDto, userId },
      ),
    );
  }

  async getEventRewardRequests(jwtPayload: JwtPayload) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: MESSAGE_CMD.GET_EVENT_REWARD_REQUESTS,
        },
        jwtPayload,
      ),
    );
  }
}
