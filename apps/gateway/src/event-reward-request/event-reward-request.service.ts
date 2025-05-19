import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';
import { JwtPayload } from 'common/type/jwt-payload';
import { MSA_SERVICE } from 'common/const/msa-service';

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
          cmd: 'request-event-reward',
        },
        { ...requestEventRewardDto, userId },
      ),
    );
  }

  async getEventRewardRequests(jwtPayload: JwtPayload) {
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
