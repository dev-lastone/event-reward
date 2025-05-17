import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum RewardRequestStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Schema()
export class RewardRequest {
  @Prop({ required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  eventId: mongoose.Schema.Types.ObjectId;

  @Prop()
  rewardId?: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: RewardRequestStatus, default: 'PENDING' })
  status: RewardRequestStatus;

  @Prop()
  failureReason?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
