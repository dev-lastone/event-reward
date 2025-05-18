import { Body, Controller, Get, Post } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  // role operator
  @Post()
  async createRewards(@Body() createRewardDto: CreateRewardDto) {
    return await this.rewardService.createReward(createRewardDto);
  }

  // role operator
  @Get()
  async getRewards() {
    return await this.rewardService.findRewards();
  }
}
