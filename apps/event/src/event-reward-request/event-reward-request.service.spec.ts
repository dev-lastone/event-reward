import { Test, TestingModule } from '@nestjs/testing';
import { EventRewardRequestService } from './event-reward-request.service';

describe('EventRewardRequestService', () => {
  let service: EventRewardRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventRewardRequestService],
    }).compile();

    service = module.get<EventRewardRequestService>(EventRewardRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
