import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from '../../../../event/src/event/entity/event.entity';

export class UpdateEventStatusDto {
  @ApiProperty({
    example: EventStatus.ACTIVE,
  })
  @IsEnum(EventStatus)
  @IsNotEmpty()
  status: EventStatus;
}
