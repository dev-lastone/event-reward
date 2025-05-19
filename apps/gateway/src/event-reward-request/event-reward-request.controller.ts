import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../../../auth/src/user/entity/user.entity';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';

@Controller('event-reward-requests')
export class EventRewardRequestController {
  constructor(
    private readonly eventRewardRequestService: EventRewardRequestService,
  ) {}

  @ApiOperation({
    summary: '보상 요청',
  })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Post()
  async requestEventReward(
    @Req() req,
    @Body() requestEventRewardDto: RequestEventRewardDto,
  ) {
    return await this.eventRewardRequestService.requestEventReward(
      req.user._id,
      requestEventRewardDto,
    );
  }

  @ApiOperation({
    summary: '보상 요청 내역',
  })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getEventRewardRequests(@Req() req) {
    return await this.eventRewardRequestService.getEventRewardRequests(
      req.user,
    );
  }
}
