import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventDto } from '../../../event/src/event/dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { sendMsaMessage } from 'common/util/send-msa-message';

@Injectable()
export class EventService {
  constructor(
    @Inject(MSA_SERVICE.EVENT)
    private readonly eventMsaService: ClientProxy,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    return await sendMsaMessage(
      this.eventMsaService,
      MESSAGE_CMD.CREATE_EVENT,
      createEventDto,
    );
  }

  async getEvents() {
    // TODO 유저면 공개된 이벤트만 조회

    return await sendMsaMessage(
      this.eventMsaService,
      MESSAGE_CMD.GET_EVENTS,
      {},
    );
  }

  async getEvent(eventId: string) {
    // TODO 유저면 공개된 이벤트만 조회

    return await sendMsaMessage(this.eventMsaService, MESSAGE_CMD.GET_EVENT, {
      eventId,
    });
  }

  async addEventReward(eventId: string, dto: AddEventRewardDto) {
    return await sendMsaMessage(
      this.eventMsaService,
      MESSAGE_CMD.ADD_EVENT_REWARD,
      {
        ...dto,
        eventId,
      },
    );
  }
}
