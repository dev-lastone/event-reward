import { Test, TestingModule } from '@nestjs/testing';
import { EventRewardRequestController } from './event-reward-request.controller';
import { EventRewardRequestService } from './event-reward-request.service';

describe('EventRewardRequestController', () => {
  let controller: EventRewardRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventRewardRequestController],
      providers: [EventRewardRequestService],
    }).compile();

    controller = module.get<EventRewardRequestController>(EventRewardRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
