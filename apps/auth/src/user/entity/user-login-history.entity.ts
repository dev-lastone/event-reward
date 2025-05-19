import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserLoginHistory extends Document {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ default: Date.now, required: true })
  createdAt: Date;
}

export const UserLoginHistorySchema =
  SchemaFactory.createForClass(UserLoginHistory);

UserLoginHistorySchema.set('collection', 'user_login_histories');
