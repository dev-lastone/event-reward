import { IsNotEmpty, IsString } from 'class-validator';
import { EventStatus } from '../entity/event.entity';

export class UpdateEventStatusDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  status: EventStatus;
}
