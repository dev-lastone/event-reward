import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UserService } from '../user/user.service';
import { ApiOperation } from '@nestjs/swagger';

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

  // 유저 로그인

  // 유저 역할 변경
}
