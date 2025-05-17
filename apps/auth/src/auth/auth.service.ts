import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UserUpdateRoleDto } from '../user/dto/user-update-role.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, password: string) {
    const user = await this.userService.findOneByLoginId(loginId);

    if (user) {
      const isPassed = await bcrypt.compare(password, user.password);
      if (isPassed) {
        return user;
      }
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

  async updateRole(userUpdateRoleDto: UserUpdateRoleDto) {
    await this.userService.updateRole(userUpdateRoleDto);
  }
}
