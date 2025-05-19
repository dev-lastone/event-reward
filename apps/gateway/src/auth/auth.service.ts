import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateAuthRoleDto } from './dto/update-auth-role.dto';
import { MSA_SERVICE } from 'common/const/msa-service';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { sendMsaMessage } from 'common/util/send-msa-message';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MSA_SERVICE.AUTH)
    private readonly authMsaService: ClientProxy,
  ) {}

  async registerAdmin(registerDto: RegisterDto) {
    return await sendMsaMessage(
      this.authMsaService,
      MESSAGE_CMD.REGISTER_ADMIN,
      registerDto,
    );
  }

  async registerUser(registerDto: RegisterDto) {
    return await sendMsaMessage(
      this.authMsaService,
      MESSAGE_CMD.REGISTER_USER,
      registerDto,
    );
  }

  async updateAuthRole(userId: string, dto: UpdateAuthRoleDto) {
    return await sendMsaMessage(
      this.authMsaService,
      MESSAGE_CMD.UPDATE_AUTH_ROLE,
      {
        userId,
        role: dto.role,
      },
    );
  }
}
