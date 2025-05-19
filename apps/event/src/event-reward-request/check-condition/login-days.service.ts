import { Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';

@Injectable()
export class LoginDaysService implements ICheckCondition {
  async getData() {
    /*
    이벤트 기간 조회
    const userLoginHistories = await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'get-user-histories',
        },
        { userId },
      ),
    );
     */
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
