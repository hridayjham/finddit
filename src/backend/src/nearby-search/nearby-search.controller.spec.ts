import { Test, TestingModule } from '@nestjs/testing';
import { NearbySearchController } from './nearby-search.controller';

describe('NearbySearchController', () => {
  let controller: NearbySearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearbySearchController],
    }).compile();

    controller = module.get<NearbySearchController>(NearbySearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
