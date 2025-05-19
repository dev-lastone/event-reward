import { Inject, Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ComeBackService implements ICheckCondition {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authMsaService: ClientProxy,
  ) {}

  async getData() {
    // TODO 마지막 로그인 날짜 조회
  }

  check(lastLoginDate: Date, conditionParams: { days: number }): boolean {
    const { days } = conditionParams;

    const now = new Date();
    const diffDays =
      (now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays >= days;
  }
}
