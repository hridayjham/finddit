import { Module } from '@nestjs/common';
import { NearbySearchService } from './nearby-search.service';
import { NearbySearchController } from './nearby-search.controller';

@Module({
  providers: [NearbySearchService],
  controllers: [NearbySearchController],
  exports: [NearbySearchService],
})
export class NearbySearchModule {}
