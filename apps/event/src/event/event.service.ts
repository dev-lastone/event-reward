import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
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
}
