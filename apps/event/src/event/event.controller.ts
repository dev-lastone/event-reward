import { Controller, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetEventDto } from './dto/get-event.dto';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { RpcInterceptor } from 'common/interceptor/rpc.interceptor';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({
    cmd: MESSAGE_CMD.CREATE_EVENT,
  })
  @UseInterceptors(RpcInterceptor)
  async msgCreateEvent(@Payload() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_EVENTS,
  })
  @UseInterceptors(RpcInterceptor)
  async msgGetEvents() {
    return await this.eventService.getEvents();
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_EVENT,
  })
  @UseInterceptors(RpcInterceptor)
  async msgGetEvent(@Payload() dto: GetEventDto) {
    return await this.eventService.getEvent(dto.eventId);
  }

  // TODO 이벤트 상태 변경

  @MessagePattern({
    cmd: MESSAGE_CMD.ADD_EVENT_REWARD,
  })
  @UseInterceptors(RpcInterceptor)
  async msgAddEventReward(@Payload() dto: AddEventRewardDto) {
    return await this.eventService.addEventReward(dto.eventId, dto);
  }
}
