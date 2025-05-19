import { Controller, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetEventDto } from './dto/get-event.dto';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { RpcInterceptor } from 'common/interceptor/rpc.interceptor';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { GetEventsDto } from './dto/get-events.dto';

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
  async msgGetEvents(@Payload() dto: GetEventsDto) {
    return await this.eventService.getEvents(dto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_EVENT,
  })
  @UseInterceptors(RpcInterceptor)
  async msgGetEvent(@Payload() dto: GetEventDto) {
    return await this.eventService.getEvent(dto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.UPDATE_EVENT_STATUS,
  })
  @UseInterceptors(RpcInterceptor)
  async updateEventStatus(@Payload() dto: UpdateEventStatusDto) {
    return await this.eventService.updateEventStatus(dto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.ADD_EVENT_REWARD,
  })
  @UseInterceptors(RpcInterceptor)
  async msgAddEventReward(@Payload() dto: AddEventRewardDto) {
    return await this.eventService.addEventReward(dto.eventId, dto);
  }
}
