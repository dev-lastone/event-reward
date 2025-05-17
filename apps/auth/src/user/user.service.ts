import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './entity/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserUpdateRoleDto } from './dto/user-update-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async registerAdmin(userRegisterDto: UserRegisterDto) {
    return this.userModel.create({
      ...userRegisterDto,
      role: UserRole.ADMIN,
    });
  }

  async register(userRegisterDto: UserRegisterDto) {
    return this.userModel.create({
      ...userRegisterDto,
    });
  }

  async findOneByLoginId(loginId: string) {
    return this.userModel.findOne({ loginId });
  }

  async updateRole(userUpdateRoleDto: UserUpdateRoleDto) {
    await this.userModel.updateOne(
      {
        loginId: userUpdateRoleDto.loginId,
      },
      {
        role: userUpdateRoleDto.role,
      },
    );
  }
}
