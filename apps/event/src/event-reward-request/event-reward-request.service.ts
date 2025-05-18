import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventRewardRequest } from './entity/event-reward-request.entity';
import { Model } from 'mongoose';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';

@Injectable()
export class EventRewardRequestService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(EventRewardRequest.name)
    private readonly eventRewardRequestModel: Model<EventRewardRequest>,
  ) {}

  async requestEventReward(requestEventRewardDto: RequestEventRewardDto) {
    const { userId, eventId, rewardId } = requestEventRewardDto;

    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException();
    }

    const alreadyRequested = await this.eventRewardRequestModel.findOne({
      userId,
      eventId,
      rewardId,
    });
    if (alreadyRequested) {
      throw new BadRequestException('이미 요청한 이벤트 보상입니다.');
    }

    // TODO 검증
    const isEligible = true;

    await this.eventRewardRequestModel.create({
      userId,
      eventId,
      rewardId,
      status: isEligible ? 'SUCCESS' : 'FAILED',
      failureReason: isEligible ? null : '조건 불충족',
    });
  }

  // TODO checkCondition
}
