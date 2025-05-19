import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { CreateEventDto } from '../../../event/src/event/dto/create-event.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../../../auth/src/user/entity/user.entity';

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
  @Roles(UserRole.OPERATOR)
  @Get()
  async getEvents() {
    return await this.eventService.getEvents();
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OPERATOR)
  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string) {
    return await this.eventService.getEvent(eventId);
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
