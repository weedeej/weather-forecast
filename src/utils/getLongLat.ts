import { apiBaseUrl, weatherApiKey } from "../constants";
import { GeoData } from "../types";

/**
 * Sends a request to http://api.openweathermap.org for geodata of cityname
 * @param cityName
 * @returns GeoData list
 */
export async function getLongLat(cityName: string) {
  let res: Response | undefined;
  try {
    res = await fetch(`${apiBaseUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherApiKey}`);
  } catch {
    throw "An Error has occured while fetching City";
  }
  const respData = (await res.json()) as GeoData[];
  return respData;
}