import { apiBaseUrl, weatherApiKey } from "../constants";
import { Forecast, GeoData } from "../types";
import { getLongLat } from "./getLongLat";

export async function fetchForecast(cityName: string) {
  const geoData = await getLongLat(cityName);
  const {lon, lat} = geoData;

  let resp: Response | undefined;
  try {
    resp = await fetch(`${apiBaseUrl}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`);
  } catch {
    throw "An error has occured while fetching Forecast";
  }
  
  const respData = (await resp.json()) as Forecast;
  return respData;
}