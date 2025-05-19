import { Injectable } from '@nestjs/common';
import { ICheckCondition } from './check-condition.service';

@Injectable()
export class ContinuousLoginDaysService implements ICheckCondition {
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
