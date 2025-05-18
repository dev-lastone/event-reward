import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserLoginHistory extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  loginDate: Date;
}

export const UserLoginHistorySchema =
  SchemaFactory.createForClass(UserLoginHistory);

UserLoginHistorySchema.set('collection', 'user_login_histories');
