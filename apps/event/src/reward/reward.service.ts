import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './entity/reward.entity';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name)
    private readonly rewardModel: Model<Reward>,
  ) {}

  async createReward(createRewardDto: CreateRewardDto) {
    return this.rewardModel.create({ ...createRewardDto });
  }

  async findRewards() {
    return this.rewardModel.find();
  }

  async findOne(_id: string) {
    return this.rewardModel.findById({
      _id,
    });
  }
}
