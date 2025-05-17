import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // 이벤트 생성
  // role operator
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  // 이벤트 전체 조회
  // role operator
  @Get()
  async getEvents() {
    return await this.eventService.findAll();
  }

  // 이벤트 상세 조회
  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string) {
    return await this.eventService.findOne(eventId);
  }

  // role - user
  // events/:eventId/reward-request

  // 보상 요청 내역
  // role - user, operator, auditor, admin
}
