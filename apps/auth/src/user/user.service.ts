import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './entity/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserUpdateRoleDto } from './dto/user-update-role.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserLoginHistory } from './entity/user-login-history.entity';
import { GetUserLoginDatesByPeriodDto } from './dto/get-user-login-dates-by-period.dto';
import { GetUserLastLoginDateDto } from './dto/get-user-last-login-date.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(UserLoginHistory.name)
    private readonly userLoginHistoryModel: Model<UserLoginHistory>,
  ) {}

  async registerAdmin(userRegisterDto: UserRegisterDto) {
    return await this.#register(userRegisterDto, UserRole.ADMIN);
  }

  async register(userRegisterDto: UserRegisterDto) {
    return await this.#register(userRegisterDto);
  }

  async #register(userRegisterDto: UserRegisterDto, role?: UserRole) {
    const existingUser = await this.userModel.findOne({
      username: userRegisterDto.username,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      userRegisterDto.password,
      this.configService.get<number>('HASH_ROUNDS'),
    );

    const createUser = await this.userModel.create({
      username: userRegisterDto.username,
      password: hashedPassword,
      role: role || UserRole.USER,
    });

    return {
      _id: createUser._id,
      username: createUser.username,
      role: createUser.role,
    };
  }

  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async updateRole(userUpdateRoleDto: UserUpdateRoleDto) {
    await this.userModel.updateOne(
      {
        _id: userUpdateRoleDto.userId,
      },
      {
        role: userUpdateRoleDto.role,
      },
    );
  }

  async getUserLoginDatesByPeriod(dto: GetUserLoginDatesByPeriodDto) {
    const result = await this.userLoginHistoryModel
      .find(
        {
          userId: dto.userId,
          createdAt: {
            $gte: dto.startDate,
            $lte: dto.endDate,
          },
        },
        {
          createdAt: 1,
        },
      )
      .exec();

    return result.map((item) => item.createdAt);
  }

  async getUserLastLoginDateDto(dto: GetUserLastLoginDateDto) {
    const result = await this.userLoginHistoryModel.findOne(
      {
        userId: dto.userId,
      },
      {
        createdAt: 1,
      },
      {
        sort: { _id: -1 },
      },
    );
    return result.createdAt;
  }
}
