import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UpdateAuthRoleDto } from './dto/update-auth-role.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { UserRole } from '../../../auth/src/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { User } from '../decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '최초 관리자 등록 용도(실 사용시 내부망 전용)',
  })
  @Post('register-admin')
  async registerAdmin(@Body() registerDto: RegisterDto) {
    await this.authService.registerAdmin(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @User() user: { accessToken: string },
    @Body() loginDto: LoginDto,
  ) {
    return user;
  }

  @ApiOperation({
    summary: '유저 등록',
  })
  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    await this.authService.registerUser(registerDto);
  }

  @ApiOperation({
    summary: '유저 권한 변경',
  })
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('role/:username')
  async updateRole(
    @Param('username') username: string,
    @Body() dto: UpdateAuthRoleDto,
  ) {
    await this.authService.updateAuthRole(username, dto);
  }
}
