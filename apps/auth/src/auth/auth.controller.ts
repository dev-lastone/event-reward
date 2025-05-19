import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../user/entity/user.entity';
import { RolesGuard } from '../guard/roles.guard';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '최초 관리자 등록 용도(실 사용시 내부망 전용)',
  })
  @Post('register-admin')
  async registerAdmin(@Body() userRegisterDto: UserRegisterDto) {
    return await this.authService.registerAdmin(userRegisterDto);
  }

  @MessagePattern({
    cmd: 'register-admin',
  })
  async msgRegisterAdmin(@Payload() userRegisterDto: UserRegisterDto) {
    await this.authService.registerAdmin(userRegisterDto);

    return true;
  }

  @ApiOperation({
    summary: '유저 등록',
  })
  @Post('register')
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    await this.authService.register(userRegisterDto);
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

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('role/:username')
  async updateUserRole(
    @Param('username') username: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    await this.authService.updateRole({
      username,
      role: updateRoleDto.role,
    });
  }
}
