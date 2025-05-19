import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authMsaService: ClientProxy,
  ) {}

  async registerAdmin(registerDto: RegisterDto) {
    const res = await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'register-admin',
        },
        { ...registerDto },
      ),
    );
    console.log(res);
  }

  async registerUser(registerDto: RegisterDto) {
    const res = await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'register-user',
        },
        { ...registerDto },
      ),
    );
    console.log(res);
  }

  async login(user: any) {
    const res = await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'login',
        },
        user,
      ),
    );
    console.log(res);
  }
}
