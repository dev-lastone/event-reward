import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Reward {
  @Prop({ required: true })
  eventId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  type: 'POINT' | 'ITEM' | 'COUPON';

  @Prop({ required: true })
  value: string; // 포인트 숫자 or 아이템명 or 쿠폰코드 등

  @Prop()
  quantity: number;

  @Prop()
  description?: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
