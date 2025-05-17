import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './entity/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';

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
}
