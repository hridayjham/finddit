import { Controller, Get, Query } from '@nestjs/common';
import { NearbySearchService } from './nearby-search.service';
import { NearbyRequestDto } from 'src/dto/nearby-request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('nearby-search')
@ApiTags('nearby-search')
export class NearbySearchController {
  constructor(private readonly nearbysearchService: NearbySearchService) {}

  @Get()
  async getNearbyRestaurants(
    @Query() searchParams: NearbyRequestDto,
  ): Promise<any> {
    console.log(JSON.stringify(searchParams));
    return await this.nearbysearchService.getNearbyRestaurants(searchParams);
  }
  // const searchParams: SearchRequest = { // need to get this from the frontend
  //     latitude: 43.260565,
  //     longitude: -79.919225 ,
  //     radius: 1000,
  //     keyword: 'restaurant',
  //     maxPrice: 4,
  //     minPrice: 1,
  // }
}
