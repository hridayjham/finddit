import { Test, TestingModule } from '@nestjs/testing';
import { NearbySearchService } from './nearby-search.service';

describe('NearbySearchService', () => {
  let service: NearbySearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearbySearchService],
    }).compile();

    service = module.get<NearbySearchService>(NearbySearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
