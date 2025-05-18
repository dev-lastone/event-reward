import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';

@Controller('event-reward-requests')
export class EventRewardRequestController {
  constructor(
    private readonly eventRewardRequestService: EventRewardRequestService,
  ) {}

  // 보상 요청
  // role - user
  // 중복 요청 검증
  // 조건 충족 검증
  @Post()
  async requestEventReward(
    @Body() requestEventRewardDto: RequestEventRewardDto,
  ) {
    return await this.eventRewardRequestService.requestEventReward(
      requestEventRewardDto,
    );
  }

  // 보상 요청 내역
  // role - operator, auditor, admin
  @Get()
  async getEventRewardRequests() {
    return await this.eventRewardRequestService.getEventRewardRequests();
  }

  // 보상 요청 내역 유저
  // role - user
  @Get(':userId')
  async getUserEventRewardRequests(@Param('userId') userId: string) {
    return await this.eventRewardRequestService.getUserEventRewardRequests(
      userId,
    );
  }
}
