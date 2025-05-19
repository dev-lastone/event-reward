import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetEventDto } from './dto/get-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  @MessagePattern({
    cmd: 'create-event',
  })
  async msgCreateEvent(@Payload() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  @Get()
  async getEvents() {
    return await this.eventService.findAll();
  }

  @MessagePattern({
    cmd: 'get-events',
  })
  async msgGetEvents() {
    return await this.eventService.findAll();
  }

  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string) {
    return await this.eventService.findOne(eventId);
  }

  @MessagePattern({
    cmd: 'get-event',
  })
  async msgGetEvent(@Payload() dto: GetEventDto) {
    return await this.eventService.findOne(dto.eventId);
  }

  @Post(':eventId/reward')
  async addEventReward(
    @Param('eventId') eventId: string,
    @Body() addEventRewardDto: AddEventRewardDto,
  ) {
    return await this.eventService.addEventReward(eventId, addEventRewardDto);
  }

  @MessagePattern({
    cmd: 'add-event-reward',
  })
  async msgAddEventReward(@Payload() dto: AddEventRewardDto) {
    return await this.eventService.addEventReward(dto.eventId, dto);
  }
}
