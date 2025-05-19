import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({
    cmd: 'register-admin',
  })
  async msgRegisterAdmin(@Payload() userRegisterDto: UserRegisterDto) {
    await this.authService.registerAdmin(userRegisterDto);

    return true;
  }

  @MessagePattern({
    cmd: 'register-user',
  })
  async msgRegister(@Payload() userRegisterDto: UserRegisterDto) {
    await this.authService.register(userRegisterDto);

    return true;
  }

  @MessagePattern({
    cmd: 'login',
  })
  async msgLogin(@Payload() userRegisterDto: UserRegisterDto) {
    return await this.authService.login(
      userRegisterDto.username,
      userRegisterDto.password,
    );
  }

  @MessagePattern({
    cmd: 'update-auth-role',
  })
  async msgUpdateAuthRole(@Payload() updateRoleDto: UpdateRoleDto) {
    await this.authService.updateRole(updateRoleDto);

    return true;
  }
}
