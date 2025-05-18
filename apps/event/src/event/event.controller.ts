import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // role operator
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  // role operator
  @Get()
  async getEvents() {
    return await this.eventService.findAll();
  }

  // role operator
  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string) {
    // TODO reward 까지 조회
    return await this.eventService.findOne(eventId);
  }

  // role operator
  @Post(':eventId/reward')
  async addEventReward(
    @Param('eventId') eventId: string,
    @Body() addEventRewardDto: AddEventRewardDto,
  ) {
    return await this.eventService.addEventReward(eventId, addEventRewardDto);
  }
}
