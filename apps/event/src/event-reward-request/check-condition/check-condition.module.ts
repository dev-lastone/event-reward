import { Module } from '@nestjs/common';
import { CheckConditionService } from './check-condition.service';
import { ComeBackService } from './come-back.service';
import { LoginDaysService } from './login-days.service';
import { ContinuousLoginDaysService } from './continuouse-login-days.service';

@Module({
  providers: [
    ComeBackService,
    LoginDaysService,
    ContinuousLoginDaysService,
    CheckConditionService,
  ],
  exports: [CheckConditionService],
})
export class CheckConditionModule {}
