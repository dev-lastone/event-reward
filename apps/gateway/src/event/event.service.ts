import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventDto } from '../../../event/src/event/dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { sendMsaMessage } from 'common/util/send-msa-message';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { UserRole } from '../../../auth/src/user/entity/user.entity';

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

  async getEvents(role: UserRole) {
    return await sendMsaMessage(this.eventMsaService, MESSAGE_CMD.GET_EVENTS, {
      role,
    });
  }

  async getEvent(eventId: string, role: UserRole) {
    return await sendMsaMessage(this.eventMsaService, MESSAGE_CMD.GET_EVENT, {
      eventId,
      role,
    });
  }

  async updateEventStatus(
    eventId: string,
    updateEventStatusDto: UpdateEventStatusDto,
  ) {
    return await sendMsaMessage(
      this.eventMsaService,
      MESSAGE_CMD.UPDATE_EVENT_STATUS,
      {
        eventId,
        status: updateEventStatusDto.status,
      },
    );
  }

  async addEventReward(eventId: string, dto: AddEventRewardDto) {
    return await sendMsaMessage(
      this.eventMsaService,
      MESSAGE_CMD.ADD_EVENT_REWARD,
      {
        ...dto,
        eventId,
        conditionParams: JSON.parse(dto.conditionParams),
      },
    );
  }
}
