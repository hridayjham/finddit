import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RestaurantDto } from 'src/dto/restaurant-response.dto';
import { NearbyRequestDto } from 'src/dto/nearby-request.dto';
require('dotenv').config();
const API_ENDPOINT =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

@Injectable()
export class NearbySearchService {
  sayHello(): string {
    return 'Hello World from nearby service! sdas';
  }
  async getNearbyRestaurants(
    request: NearbyRequestDto,
  ): Promise<RestaurantDto[]> {
    const restaurants = [];
    try {
      var response = await axios.get(API_ENDPOINT, {
        params: {
          type: 'restaurant', //hardcoded for now to restaurant
          location: `${request.latitude},${request.longitude}`,
          key: process.env.GCP_KEY,
          radius: `${request.radius}`,
          maxprice: `${request.maxPrice}`,
          minprice: `${request.minPrice}`,
          opennow: `${request.openNow}`,
        },
      });

      var apiResponse = response.data;
      if (apiResponse && apiResponse.results) {
        for (const rest of apiResponse.results) {
          const rdto = new RestaurantDto();
          rdto.business_status = rest.business_status;
          rdto.lat = rest.geometry.location.lat;
          rdto.long = rest.geometry.location.lng;
          rdto.name = rest.name;
          rdto.place_opening_hours = rest.opening_hours;
          rdto.photos = rest.photos;
          rdto.place_id = rest.place_id;
          rdto.plus_code = rest.plus_code;
          rdto.price_level = rest.price_level;
          rdto.rating = rest.rating;
          rdto.user_ratings_total = rest.user_ratings_total;
          rdto.vicinity = rest.vicinity;
          restaurants.push(rdto);
        }
        return restaurants;
      } else {
        throw new Error('Invalid response from the API');
      }
    } catch (error) {
      throw new Error(`Failed to fetch nearby restaurants: ${error.message}`);
    }
  }
}
