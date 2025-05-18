import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum RewardType {
  POINT = 'POINT',
  ITEM = 'ITEM',
  COUPON = 'COUPON',
}

export enum ConditionType {
  LOGIN_DAYS = 'LOGIN_DAYS', // 로그인 횟수
  CONTINUOUS_LOGIN_DAYS = 'CONTINUOUS_LOGIN_DAYS', // 최대 연속 출석 체크
  COME_BACK = 'COME_BACK', // 복귀유저
  LOTTERY = 'LOTTERY', // 추첨
}

@Schema()
export class Reward {
  @Prop({ required: true })
  eventId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: RewardType, required: true })
  type: RewardType;

  @Prop({ required: true, default: true })
  isAuto: boolean;

  @Prop({ enum: ConditionType, required: true })
  conditionType: ConditionType;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  conditionParams: any;

  @Prop({ required: true })
  value: string; // 포인트 숫자 or 아이템명 or 쿠폰코드 등

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop()
  description?: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
