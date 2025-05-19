import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ConditionType, RewardType } from '../entity/reward.entity';

export class AddEventRewardDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  type: RewardType;

  @IsBoolean()
  @IsNotEmpty()
  isAuto: boolean;

  @IsEnum(ConditionType)
  @IsNotEmpty()
  conditionType: ConditionType;

  conditionParams?: any;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  description?: string;
}
