import { Inject, Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Event } from '../../event/entity/event.entity';
import { MSA_SERVICE } from 'common/const/msa-service';
import { getSetDates } from 'common/util/get-set-dates';

@Injectable()
export class LoginDaysService implements ICheckCondition {
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
    const { days } = conditionParams;
    return uniqueDates.size >= days;
  }
}
