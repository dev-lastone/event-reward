import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export async function sendMsaMessage(
  msaService: ClientProxy,
  cmd: string,
  data: any,
) {
  try {
    return await lastValueFrom(
      msaService.send(
        {
          cmd,
        },
        data,
      ),
    );
  } catch (e) {
    if (e.status === 400) {
      throw new BadRequestException(e.message);
    } else {
      throw new InternalServerErrorException();
    }
  }
}
