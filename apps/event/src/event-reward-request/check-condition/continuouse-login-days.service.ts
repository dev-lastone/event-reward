import { Inject, Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Event } from '../../event/entity/event.entity';
import { MSA_SERVICE } from 'common/const/msa-service';
import { getSetDates } from 'common/util/get-set-dates';

@Injectable()
export class ContinuousLoginDaysService implements ICheckCondition {
  constructor(
    @Inject(MSA_SERVICE.AUTH)
    private readonly authMsaService: ClientProxy,
  ) {}

  async getData(userId: string, event: Event): Promise<Date[]> {
    const result = await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'get-user-login-dates-by-period',
        },
        { userId, startDate: event.startDate, endDate: event.endDate },
      ),
    );
    return result.data;
  }

  check(
    userLoginHistories: Date[],
    conditionParams: { days: number },
  ): boolean {
    const uniqueDates = getSetDates(userLoginHistories);
    const uniqueDatesArray = Array.from(uniqueDates);

    const { days } = conditionParams;
    let consecutiveDays = 1;
    let prevDate = null;
    for (const date of uniqueDatesArray) {
      const _date = new Date(date);
      if (prevDate) {
        const diff =
          (_date.getFullYear() - prevDate.getFullYear()) * 365 +
          (_date.getMonth() - prevDate.getMonth()) * 30 +
          (_date.getDate() - prevDate.getDate());

        if (diff === 1) {
          consecutiveDays++;
        } else if (diff > 1) {
          consecutiveDays = 0;
        }
      }
      prevDate = _date;
    }

    return consecutiveDays >= days;
  }
}
