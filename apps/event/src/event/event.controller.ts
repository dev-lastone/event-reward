import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetEventDto } from './dto/get-event.dto';
import { MESSAGE_CMD } from 'common/const/message-cmd';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({
    cmd: MESSAGE_CMD.CREATE_EVENT,
  })
  async msgCreateEvent(@Payload() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_EVENTS,
  })
  async msgGetEvents() {
    return await this.eventService.findAll();
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_EVENT,
  })
  async msgGetEvent(@Payload() dto: GetEventDto) {
    return await this.eventService.findOne(dto.eventId);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.ADD_EVENT_REWARD,
  })
  async msgAddEventReward(@Payload() dto: AddEventRewardDto) {
    return await this.eventService.addEventReward(dto.eventId, dto);
  }
}
