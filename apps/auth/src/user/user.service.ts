import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './entity/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserUpdateRoleDto } from './dto/user-update-role.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async registerAdmin(userRegisterDto: UserRegisterDto) {
    return await this.#register(userRegisterDto, UserRole.ADMIN);
  }

  async register(userRegisterDto: UserRegisterDto) {
    return await this.#register(userRegisterDto);
  }

  async #register(userRegisterDto: UserRegisterDto, role?: UserRole) {
    const hashedPassword = await bcrypt.hash(
      userRegisterDto.password,
      this.configService.get<number>('HASH_ROUNDS'),
    );

    return this.userModel.create({
      username: userRegisterDto.username,
      password: hashedPassword,
      role: role || UserRole.USER,
    });
  }

  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async updateRole(userUpdateRoleDto: UserUpdateRoleDto) {
    await this.userModel.updateOne(
      {
        username: userUpdateRoleDto.username,
      },
      {
        role: userUpdateRoleDto.role,
      },
    );
  }
}
