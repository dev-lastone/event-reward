import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../user/dto/user-register.dto';
import { UserUpdateRoleDto } from '../user/dto/user-update-role.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginHistory } from '../user/entity/user-login-history.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @InjectModel(UserLoginHistory.name)
    private readonly userLoginHistoryModel: Model<UserLoginHistory>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (user) {
      const isPassed = await bcrypt.compare(password, user.password);
      if (isPassed) {
        await this.userLoginHistoryModel.create({
          userId: user._id,
          loginDate: new Date(),
        });

        return {
          accessToken: this.jwtService.sign({
            sub: user._id,
            role: user.role,
          }),
        };
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

  async updateRole(userUpdateRoleDto: UserUpdateRoleDto) {
    await this.userService.updateRole(userUpdateRoleDto);
  }
}
