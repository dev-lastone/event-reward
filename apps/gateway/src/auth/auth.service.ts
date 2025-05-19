import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateAuthRoleDto } from './dto/update-auth-role.dto';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';

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
          cmd: MESSAGE_CMD.REGISTER_ADMIN,
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
          cmd: MESSAGE_CMD.REGISTER_USER,
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
          cmd: MESSAGE_CMD.LOGIN,
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
          cmd: MESSAGE_CMD.UPDATE_AUTH_ROLE,
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
