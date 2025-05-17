import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../user/dto/user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string) {
    const user = await this.userService.findOneById(id);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async registerAdmin(userRegisterDto: UserRegisterDto) {
    await this.userService.registerAdmin(userRegisterDto);
  }

  async register(userRegisterDto: UserRegisterDto) {
    await this.userService.register(userRegisterDto);
  }

  async login(user: any) {
    return {
      accessToken: this.jwtService.sign({
        sub: user._id,
        role: user.role,
      }),
    };
  }
}
