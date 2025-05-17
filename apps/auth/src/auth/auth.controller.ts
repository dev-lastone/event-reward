import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../user/entity/user.entity';
import { RolesGuard } from '../guard/roles.guard';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '최초 관리자 등록 용도(실 사용시 내부망 전용)',
  })
  @Post('register-admin')
  async registerAdmin(@Body() userRegisterDto: UserRegisterDto) {
    await this.authService.registerAdmin(userRegisterDto);
  }

  @ApiOperation({
    summary: '유저 등록',
  })
  @Post('register')
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    await this.authService.register(userRegisterDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('role/:loginId')
  async updateUserRole(
    @Param('loginId') loginId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    await this.authService.updateRole({
      loginId,
      role: updateRoleDto.role,
    });
  }
}
