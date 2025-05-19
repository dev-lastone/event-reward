import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: UserRole,
    default: UserRole.USER,
    required: true,
  })
  role: UserRole;

  @Prop({ default: Date.now, required: true })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
