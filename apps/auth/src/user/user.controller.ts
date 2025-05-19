import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetUserHistoriesDto } from './dto/get-user-histories.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({
    cmd: 'get-user-histories',
  })
  async msgRegister(@Payload() dto: GetUserHistoriesDto) {
    return await this.userService.getUserHistories(dto.userId);
  }
}
