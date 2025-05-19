import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  ConditionType,
  RewardType,
} from '../../../../event/src/event/entity/reward.entity';

export class AddEventRewardDto {
  @ApiProperty({
    enum: RewardType,
  })
  @IsString()
  @IsNotEmpty()
  type: RewardType;

  @ApiProperty({
    default: true,
    description: '자동 지급(검증) 여부',
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

  @ApiPropertyOptional({
    example: '{ "days": 3 }',
    description: '조건 파라미터',
  })
  @IsString()
  conditionParams?: string;

  @ApiProperty({
    example: '보상',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiPropertyOptional({
    example: '보상 설명',
  })
  @IsString()
  description?: string;
}
