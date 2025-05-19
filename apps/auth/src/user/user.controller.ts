import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetUserLoginDatesByPeriodDto } from './dto/get-user-login-dates-by-period.dto';
import { UserService } from './user.service';
import { GetUserLastLoginDateDto } from './dto/get-user-last-login-date.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({
    cmd: 'get-user-login-dates-by-period',
  })
  async getUserLoginDatesByPeriod(
    @Payload() dto: GetUserLoginDatesByPeriodDto,
  ) {
    return await this.userService.getUserLoginDatesByPeriod(dto);
  }

  @MessagePattern({
    cmd: 'get-user-last-login-date',
  })
  async getUserLastLoginDate(@Payload() dto: GetUserLastLoginDateDto) {
    return await this.userService.getUserLastLoginDateDto(dto);
  }
}
