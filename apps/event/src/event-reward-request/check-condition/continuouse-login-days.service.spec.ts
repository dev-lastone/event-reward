import { Test, TestingModule } from '@nestjs/testing';
import { ContinuousLoginDaysService } from './continuouse-login-days.service';
import { MSA_SERVICE } from 'common/const/msa-service';

describe('ContinuousLoginDaysService', () => {
  let service: ContinuousLoginDaysService;

  const mockClientProxy = {
    send: jest.fn(),
    emit: jest.fn(),
  };
  const mockAuthMsaService = {
    provide: MSA_SERVICE.AUTH,
    useValue: mockClientProxy,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContinuousLoginDaysService, mockAuthMsaService],
    }).compile();

    service = module.get<ContinuousLoginDaysService>(
      ContinuousLoginDaysService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fail', () => {
    const userLoginHistories = [{ date: '2023-10-01' }, { date: '2023-10-02' }];

    const result = service.check(userLoginHistories, { days: 3 });

    expect(result).toBe(false);
  });

  it('연속되지 않아 실패', () => {
    const userLoginHistories = [
      { date: '2023-10-01' },
      { date: '2023-10-02' },
      { date: '2023-10-04' },
    ];
    const result = service.check(userLoginHistories, { days: 3 });

    expect(result).toBe(false);
  });

  it('success', () => {
    const userLoginHistories = [
      { date: '2023-10-01' },
      { date: '2023-10-02' },
      { date: '2023-10-03' },
    ];
    const result = service.check(userLoginHistories, { days: 3 });

    expect(result).toBe(true);
  });
});
