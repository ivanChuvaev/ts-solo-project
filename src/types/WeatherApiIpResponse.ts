export type WeatherApiIpResponse = {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  is_eu: boolean;
  geoname_id: number;
  city: string;
  region: null;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};
