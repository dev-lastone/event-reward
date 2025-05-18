import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum RewardType {
  POINT = 'POINT',
  ITEM = 'ITEM',
  COUPON = 'COUPON',
}

@Schema()
export class Reward {
  @Prop({ required: true })
  eventId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: RewardType, required: true })
  type: RewardType;

  @Prop({ required: true })
  value: string; // 포인트 숫자 or 아이템명 or 쿠폰코드 등

  @Prop()
  quantity: number;

  @Prop()
  description?: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
