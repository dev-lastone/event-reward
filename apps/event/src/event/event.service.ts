import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { Reward } from './entity/reward.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,

    @InjectModel(Reward.name)
    private readonly rewardModel: Model<Reward>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    return this.eventModel.create({ ...createEventDto });
  }

  async findAll() {
    return this.eventModel.find();
  }

  async findOne(_id: string) {
    return this.eventModel.findById({
      _id,
    });
  }

  async addEventReward(eventId: string, addEventRewardDto: AddEventRewardDto) {
    return this.rewardModel.create({ ...addEventRewardDto, eventId });
  }
}
