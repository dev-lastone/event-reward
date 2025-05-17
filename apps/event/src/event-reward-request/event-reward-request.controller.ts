import { Controller } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';

@Controller('event-reward-request')
export class EventRewardRequestController {
  constructor(
    private readonly eventRewardRequestService: EventRewardRequestService,
  ) {}

  // 보상 요청
  // role - user
  // 중복 요청 검증
  // 조건 충족 검증

  // 보상 요청 내역
  // role - user, operator, auditor, admin
}
