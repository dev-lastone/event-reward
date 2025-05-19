import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { MESSAGE_CMD } from 'common/const/message-cmd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({
    cmd: MESSAGE_CMD.REGISTER_ADMIN,
  })
  async msgRegisterAdmin(@Payload() userRegisterDto: UserRegisterDto) {
    await this.authService.registerAdmin(userRegisterDto);

    return true;
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.REGISTER_USER,
  })
  async msgRegister(@Payload() userRegisterDto: UserRegisterDto) {
    await this.authService.register(userRegisterDto);

    return true;
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.LOGIN,
  })
  async msgLogin(@Payload() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.UPDATE_AUTH_ROLE,
  })
  async msgUpdateAuthRole(@Payload() updateRoleDto: UpdateRoleDto) {
    await this.authService.updateRole(updateRoleDto);

    return true;
  }
}
