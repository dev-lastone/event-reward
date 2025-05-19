import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetUserLoginDatesByPeriodDto } from './dto/get-user-login-dates-by-period.dto';
import { UserService } from './user.service';
import { GetUserLastLoginDateDto } from './dto/get-user-last-login-date.dto';
import { MESSAGE_CMD } from 'common/const/message-cmd';
import { RpcInterceptor } from 'common/interceptor/rpc.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_USER_LOGIN_DATES_BY_PERIOD,
  })
  @UseInterceptors(RpcInterceptor)
  async getUserLoginDatesByPeriod(
    @Payload() dto: GetUserLoginDatesByPeriodDto,
  ) {
    return await this.userService.getUserLoginDatesByPeriod(dto);
  }

  @MessagePattern({
    cmd: MESSAGE_CMD.GET_USER_LAST_LOGIN_DATE,
  })
  @UseInterceptors(RpcInterceptor)
  async getUserLastLoginDate(@Payload() dto: GetUserLastLoginDateDto) {
    return await this.userService.getUserLastLoginDateDto(dto);
  }
}
