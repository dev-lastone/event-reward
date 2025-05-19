import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateAuthRoleDto } from './dto/update-auth-role.dto';
import { MSA_SERVICE } from 'common/const/msa-service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MSA_SERVICE.AUTH)
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

  async updateAuthRole(username: string, dto: UpdateAuthRoleDto) {
    const res = await lastValueFrom(
      this.authMsaService.send(
        {
          cmd: 'update-auth-role',
        },
        {
          username,
          role: dto.role,
        },
      ),
    );
    console.log(res);
  }
}
