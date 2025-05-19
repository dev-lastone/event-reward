import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EventRewardRequestService } from './event-reward-request.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../../../auth/src/user/entity/user.entity';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';
import { User } from '../decorator/user.decorator';
import { JwtPayload } from 'common/type/jwt-payload';

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
    @User() user: JwtPayload,
    @Body() requestEventRewardDto: RequestEventRewardDto,
  ) {
    return await this.eventRewardRequestService.requestEventReward(
      user.id,
      requestEventRewardDto,
    );
  }

  @ApiOperation({
    summary: '보상 요청 내역',
  })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getEventRewardRequests(@User() user: JwtPayload) {
    return await this.eventRewardRequestService.getEventRewardRequests(user);
  }
}
