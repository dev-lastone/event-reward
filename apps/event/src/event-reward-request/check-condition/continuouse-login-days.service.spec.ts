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

  it('출석일 부족', () => {
    const userLoginHistories = [new Date('2023-10-01'), new Date('2023-10-02')];

    const result = service.check(userLoginHistories, { days: 3 });

    expect(result).toBe(false);
  });

  it('연속되지 않아 실패', () => {
    const userLoginHistories = [
      new Date('2025-05-19T21:33:22.293Z'),
      new Date('2025-05-20T21:46:49.611Z'),
      new Date('2025-05-22T22:10:04.629Z'),
      new Date('2025-05-23T22:16:01.139Z'),
    ];
    const result = service.check(userLoginHistories, { days: 3 });

    expect(result).toBe(false);
  });

  it('중복 날짜 실패', () => {
    const userLoginHistories = [
      new Date('2025-05-19T21:33:22.293Z'),
      new Date('2025-05-19T21:46:49.611Z'),
      new Date('2025-05-19T22:10:04.629Z'),
      new Date('2025-05-19T22:16:01.139Z'),
      new Date('2025-05-19T22:23:08.011Z'),
      new Date('2025-05-20T22:21:04.838Z'),
    ];
    const result = service.check(userLoginHistories, { days: 3 });

    expect(result).toBe(false);
  });

  it('success', () => {
    const userLoginHistories = [
      new Date('2025-04-30T21:33:22.293Z'),
      new Date('2025-05-01T21:46:49.611Z'),
      new Date('2025-05-02T22:10:04.629Z'),
    ];
    const result = service.check(userLoginHistories, { days: 3 });

    expect(result).toBe(true);
  });
});
