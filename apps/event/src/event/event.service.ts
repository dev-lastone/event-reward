import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { AddEventRewardDto } from './dto/add-event-reward.dto';
import { Reward } from './entity/reward.entity';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';

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

  async getEvents() {
    return this.eventModel.find();
  }

  async getEvent(_id: string) {
    const result = await this.eventModel
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(_id) },
        },
        {
          $lookup: {
            from: 'rewards',
            localField: '_id',
            foreignField: 'eventId',
            as: 'rewards',
          },
        },
      ])
      .exec();

    return result[0];
  }

  async updateEventStatus(dto: UpdateEventStatusDto) {
    return this.eventModel.updateOne(
      { _id: dto.eventId },
      { $set: { status: dto.status } },
    );
  }

  async addEventReward(eventId: string, addEventRewardDto: AddEventRewardDto) {
    return this.rewardModel.create({ ...addEventRewardDto, eventId });
  }
}
