export class RestaurantDto {
  business_status?: string;
  lat?: number;
  long?: number;
  name?: string;
  place_opening_hours?: object;
  place_id?: string;
  price_level?: number;
  photos?: object;
  rating?: number;
  plus_code?: string;
  reservable?: boolean;
  user_ratings_total?: number;
  reviews?: object;
  serves_breakfast?: boolean;
  serves_lunch?: boolean;
  serves_dinner?: boolean;
  serves_vegetarian_food?: boolean;
  serves_wine?: boolean;
  serves_beer?: boolean;
  takeout?: boolean;
  url?: string;
  vicinity?: string;
  wheelchair_accessible?: boolean;
}
