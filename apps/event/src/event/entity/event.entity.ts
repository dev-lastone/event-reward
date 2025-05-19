import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Reward } from './reward.entity';

export enum EventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    enum: EventStatus,
    default: EventStatus.INACTIVE,
    required: true,
  })
  status: EventStatus;

  @Prop({
    required: true,
    index: true,
  })
  startDate: Date;

  @Prop({
    required: true,
    index: true,
  })
  endDate: Date;

  @Prop({ default: Date.now, required: true })
  createdAt: Date;

  @Prop({ default: Date.now, required: true })
  updatedAt: Date;

  rewards?: Reward[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
