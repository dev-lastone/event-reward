import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
