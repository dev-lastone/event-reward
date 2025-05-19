import { Controller, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { RpcInterceptor } from 'common/interceptor/rpc.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({
    cmd: MESSAGE_CMD.REGISTER_ADMIN,
  })
  @UseInterceptors(RpcInterceptor)
  async msgRegisterAdmin(@Payload() userRegisterDto: UserRegisterDto) {
    return await this.authService.registerAdmin(userRegisterDto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.REGISTER_USER,
  })
  @UseInterceptors(RpcInterceptor)
  async msgRegister(@Payload() userRegisterDto: UserRegisterDto) {
    return await this.authService.register(userRegisterDto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.LOGIN,
  })
  @UseInterceptors(RpcInterceptor)
  async msgLogin(@Payload() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.UPDATE_AUTH_ROLE,
  })
  @UseInterceptors(RpcInterceptor)
  async msgUpdateAuthRole(@Payload() updateRoleDto: UpdateRoleDto) {
    await this.authService.updateRole(updateRoleDto);
  }
}
