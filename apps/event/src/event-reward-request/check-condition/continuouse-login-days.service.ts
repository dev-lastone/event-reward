import { Inject, Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Event } from '../../event/entity/event.entity';

@Injectable()
export class ContinuousLoginDaysService implements ICheckCondition {
  constructor(
    @Inject('AUTH_SERVICE')
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
    // 예시: 최대 연속 출석 체크
    const { days } = conditionParams;
    let maxStreak = 1;
    let streak = 1;

    for (let i = 1; i < userLoginHistories.length; i++) {
      const prev = new Date(userLoginHistories[i - 1]);
      const curr = new Date(userLoginHistories[i]);
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 1;
      }
    }
    return maxStreak >= days;
  }
}
