import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(id: string, password: string) {
    const user = await this.userService.findOneById(id);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }
}
