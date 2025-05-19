import { Inject, Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Event } from '../../event/entity/event.entity';
import { MSA_SERVICE } from 'common/const/msa-service';

@Injectable()
export class LoginDaysService implements ICheckCondition {
  constructor(
    @Inject(MSA_SERVICE.AUTH)
    private readonly authMsaService: ClientProxy,
  ) {}

  async getData(userId: string, event: Event): Promise<Date[]> {
    return await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'get-user-login-dates-by-period',
        },
        { userId, startDate: event.startDate, endDate: event.endDate },
      ),
    );
  }

  check(
    userLoginHistories: Date[],
    conditionParams: { days: number },
  ): boolean {
    // 예시: 기간 내 로그인 횟수
    const { days } = conditionParams;
    return userLoginHistories.length >= days;
  }
}
