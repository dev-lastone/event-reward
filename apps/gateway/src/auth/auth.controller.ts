import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

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

  @ApiOperation({
    summary: '유저 등록',
  })
  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    await this.authService.registerUser(registerDto);
  }
}
