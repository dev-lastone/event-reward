import { Inject, Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MSA_SERVICE } from 'common/const/msa-service';

@Injectable()
export class ComeBackService implements ICheckCondition {
  constructor(
    @Inject(MSA_SERVICE.AUTH)
    private readonly authMsaService: ClientProxy,
  ) {}

  async getData(userId: string): Promise<Date> {
    const result = await lastValueFrom(
      this.authMsaService.send({ cmd: 'get-user-last-login-date' }, { userId }),
    );
    return result.data;
  }

  check(lastLoginDate: Date, conditionParams: { days: number }): boolean {
    const { days } = conditionParams;

    const now = new Date();
    const diffDays =
      (now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays >= days;
  }
}
