import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ConditionType, RewardType } from '../entity/reward.entity';

export class AddEventRewardDto {
  @ApiProperty({
    enum: RewardType,
  })
  @IsString()
  @IsNotEmpty()
  type: RewardType;

  @ApiProperty({
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isAuto: boolean;

  @ApiProperty({
    enum: ConditionType,
  })
  @IsEnum(ConditionType)
  @IsNotEmpty()
  conditionType: ConditionType;

  @ApiPropertyOptional()
  conditionParams: any;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiPropertyOptional()
  @IsString()
  description?: string;
}
