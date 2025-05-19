import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EventRewardRequest,
  EventRewardRequestStatus,
} from './entity/event-reward-request.entity';
import { Model, Types } from 'mongoose';
import { RequestEventRewardDto } from './dto/request-event-reward.dto';
import { ConditionType, Reward } from '../event/entity/reward.entity';
import { Event } from '../event/entity/event.entity';
import { UserRole } from '../../../auth/src/user/entity/user.entity';

@Injectable()
export class EventRewardRequestService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,

    @InjectModel(EventRewardRequest.name)
    private readonly eventRewardRequestModel: Model<EventRewardRequest>,
  ) {}

  async requestEventReward(requestEventRewardDto: RequestEventRewardDto) {
    const { userId, eventId, rewardId } = requestEventRewardDto;

    const events = await this.eventModel
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(eventId) },
        },
        {
          $lookup: {
            from: 'rewards',
            localField: '_id',
            foreignField: 'eventId',
            as: 'rewards',
            pipeline: [
              {
                $match: { _id: new Types.ObjectId(rewardId) },
              },
            ],
          },
        },
      ])
      .exec();

    const event = events[0];
    const reward = event?.rewards[0];

    if (!event) {
      throw new NotFoundException('이벤트를 찾을 수 없습니다.');
    }

    if (!reward) {
      throw new NotFoundException('보상을 찾을 수 없습니다.');
    }

    const date = new Date();
    if (date < event.startDate || date > event.endDate) {
      throw new BadRequestException('이벤트 기간이 아닙니다.');
    }

    const alreadyRequested = await this.eventRewardRequestModel.findOne({
      userId,
      eventId,
      rewardId,
    });
    if (alreadyRequested) {
      throw new BadRequestException('이미 요청한 이벤트 보상입니다.');
    }

    if (reward.isAuth) {
      const isEligible = this.#checkCondition(userId, reward);

      await this.eventRewardRequestModel.create({
        userId,
        eventId,
        rewardId,
        status: isEligible
          ? EventRewardRequestStatus.SUCCESS
          : EventRewardRequestStatus.FAILED,
        failureReason: isEligible ? null : '조건 불충족',
      });
    } else {
      await this.eventRewardRequestModel.create({
        userId,
        eventId,
        rewardId,
        status: EventRewardRequestStatus.PENDING,
      });
    }
  }

  async #checkCondition(userId: string, reward: Reward) {
    const { conditionType, conditionParams } = reward;

    if (conditionType === ConditionType.COME_BACK) {
      // TODO: 복귀 유저 조건 체크 로직 구현
      // user histories
    } else if (conditionType === ConditionType.LOGIN_DAYS) {
      // TODO: 이벤트 기간 로그인 횟수 조건 체크 로직 구현
      // user histories
    } else if (conditionType === ConditionType.CONTINUOUS_LOGIN_DAYS) {
      // TODO : 최대 연속 출석 체크 조건 체크 로직 구현
      // user histories
    } else if (conditionType === ConditionType.FRIEND_INVITATION) {
      // TODO : 친구 초대 조건 체크 로직 구현
      // user invitations
    }

    return false;
  }

  async getEventRewardRequests(jwtPayload: any) {
    if (jwtPayload.role === UserRole.USER) {
      return this.eventRewardRequestModel.find({
        userId: jwtPayload.id,
      });
    }

    return this.eventRewardRequestModel.find();
  }
}
