import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: '최초 관리자 등록 용도(실 사용시 내부망 전용)',
  })
  @Post('register-admin')
  async registerAdmin(@Body() userRegisterDto: UserRegisterDto) {
    await this.userService.registerAdmin(userRegisterDto);
  }

  @ApiOperation({
    summary: '유저 등록',
  })
  @Post('register')
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    await this.userService.register(userRegisterDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Patch('role/:userId')
  async updateUserRole(@Req() req) {
    console.log(req.user);
  }
}
