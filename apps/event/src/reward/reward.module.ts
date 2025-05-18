import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './entity/reward.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reward.name,
        schema: RewardSchema,
      },
    ]),
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
