import { Test, TestingModule } from '@nestjs/testing';
import { ComeBackService } from './come-back.service';
import { MSA_SERVICE } from 'common/const/msa-service';

describe('ComeBackService', () => {
  let service: ComeBackService;

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
      providers: [ComeBackService, mockAuthMsaService],
    }).compile();

    service = module.get<ComeBackService>(ComeBackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('fail', () => {
      const lastLoginDate = new Date();
      lastLoginDate.setDate(lastLoginDate.getDate() - 364);

      const result = service.check(lastLoginDate, { days: 365 });

      expect(result).toBe(false);
    });

    it('success', () => {
      const days = 365;
      const lastLoginDate = new Date();
      lastLoginDate.setDate(lastLoginDate.getDate() - days);

      const result = service.check(lastLoginDate, { days });

      expect(result).toBe(true);
    });
  });
});
