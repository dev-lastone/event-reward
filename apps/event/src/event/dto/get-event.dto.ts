import { IsNotEmpty, IsString } from 'class-validator';

export class GetEventDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
