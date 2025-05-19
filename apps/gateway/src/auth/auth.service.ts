import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly userMsaService: ClientProxy,
  ) {}

  async registerAdmin(registerDto: RegisterDto) {
    const res = await lastValueFrom(
      this.userMsaService.send(
        {
          cmd: 'register-admin',
        },
        { ...registerDto },
      ),
    );
    console.log(res);
  }
}
