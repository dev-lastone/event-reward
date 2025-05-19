import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateEventDto } from '../../../event/src/event/dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { MSA_SERVICE } from 'common/const/msa-service';

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
          cmd: 'create-event',
        },
        createEventDto,
      ),
    );
  }

  async getEvents() {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: 'get-events',
        },
        {},
      ),
    );
  }

  async getEvent(eventId: string) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: 'get-event',
        },
        { eventId },
      ),
    );
  }

  async addEventReward(eventId: string, dto: AddEventRewardDto) {
    return await lastValueFrom(
      this.eventMsaService.send(
        {
          cmd: 'add-event-reward',
        },
        { ...dto, eventId },
      ),
    );
  }
}
