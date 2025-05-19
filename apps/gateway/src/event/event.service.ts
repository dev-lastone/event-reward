import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateEventDto } from '../../../event/src/event/dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';

@Injectable()
export class EventService {
  constructor(
    @Inject(MSA_SERVICE.EVENT)
    private readonly eventMsaService: ClientProxy,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: MESSAGE_CMD.CREATE_EVENT,
        },
        createEventDto,
      ),
    );
  }

  async getEvents() {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: MESSAGE_CMD.GET_EVENTS,
        },
        {},
      ),
    );
  }

  async getEvent(eventId: string) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: MESSAGE_CMD.GET_EVENT,
        },
        { eventId },
      ),
    );
  }

  async addEventReward(eventId: string, dto: AddEventRewardDto) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: MESSAGE_CMD.ADD_EVENT_REWARD,
        },
        { ...dto, eventId },
      ),
    );
  }
}
