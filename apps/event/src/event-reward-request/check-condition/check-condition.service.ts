import { Injectable } from '@nestjs/common';
import { ComeBackService } from './come-back.service';
import { LoginDaysService } from './login-days.service';
import { ContinuousLoginDaysService } from './continuouse-login-days.service';
import { ConditionType, Reward } from '../../event/entity/reward.entity';
import { Event } from '../../event/entity/event.entity';

export interface ICheckCondition {
  getData(userId: string, event?: Event): Promise<any>;
  check(data: any, conditionParams: any): boolean;
}

@Injectable()
export class CheckConditionService {
  constructor(
    private readonly comeBackService: ComeBackService,
    private readonly loginDaysService: LoginDaysService,
    private readonly continuousLoginDaysService: ContinuousLoginDaysService,
  ) {}

  async check(userId: string, event: Event, reward: Reward) {
    const service = this.#getService(reward.conditionType);
    const data = await service.getData(userId, event);
    return service.check(data, reward.conditionParams);
  }

  #getService(conditionType: ConditionType): ICheckCondition {
    switch (conditionType) {
      case ConditionType.COME_BACK:
        return this.comeBackService;
      case ConditionType.LOGIN_DAYS:
        return this.loginDaysService;
      case ConditionType.CONTINUOUS_LOGIN_DAYS:
        return this.continuousLoginDaysService;
      default:
        throw new Error('Invalid condition type');
    }
  }
}
