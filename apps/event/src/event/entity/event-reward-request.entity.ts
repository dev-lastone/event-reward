import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum EventRewardRequestStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Schema()
export class EventRewardRequest {
  @Prop({ required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  eventId: mongoose.Schema.Types.ObjectId;

  @Prop()
  rewardId?: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: EventRewardRequestStatus, default: 'PENDING' })
  status: EventRewardRequestStatus;

  @Prop()
  failureReason?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const EventRewardRequestSchema =
  SchemaFactory.createForClass(EventRewardRequest);
