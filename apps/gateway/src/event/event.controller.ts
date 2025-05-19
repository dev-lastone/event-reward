import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../../../auth/src/user/entity/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { User } from '../decorator/user.decorator';
import { JwtPayload } from 'common/type/jwt-payload';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR)
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getEvents(@User() user: JwtPayload) {
    return await this.eventService.getEvents(user.role);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string, @User() user: JwtPayload) {
    return await this.eventService.getEvent(eventId, user.role);
  }

  @ApiOperation({
    summary: '이벤트 상태 변경',
  })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR)
  @Patch(':eventId/status')
  async updateEventStatus(
    @Param('eventId') eventId: string,
    @Body() updateEventStatusDto: UpdateEventStatusDto,
  ) {
    return await this.eventService.updateEventStatus(
      eventId,
      updateEventStatusDto,
    );
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR)
  @Post(':eventId/reward')
  async addEventReward(
    @Param('eventId') eventId: string,
    @Body() addEventRewardDto: AddEventRewardDto,
  ) {
    return await this.eventService.addEventReward(eventId, addEventRewardDto);
  }
}
