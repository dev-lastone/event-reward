import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';
import { JwtPayload } from 'common/type/jwt-payload';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { sendMsaMessage } from 'common/util/send-msa-message';

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
    return await sendMsaMessage(
      this.eventMsaService,
      MESSAGE_CMD.REQUEST_EVENT_REWARD,
      { ...requestEventRewardDto, userId },
    );
  }

  async getEventRewardRequests(jwtPayload: JwtPayload) {
    return await sendMsaMessage(
      this.eventMsaService,
      MESSAGE_CMD.GET_EVENT_REWARD_REQUESTS,
      jwtPayload,
    );
  }
}
