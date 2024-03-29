import { apiBaseUrl, weatherApiKey } from "../constants";
import { Forecast } from "../types";
import { getLongLat } from "./getLongLat";

/**
 * Sends a request to http://api.openweathermap.org for forecast
 * @param cityName
 * @param limit
 * @returns Forecast object
 */
export async function fetchForecast(cityName: string, limit: number = 5) {
  const geoData = await getLongLat(cityName);
  const {lon, lat} = geoData[0];

  let resp: Response | undefined;
  try {
    resp = await fetch(`${apiBaseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=${limit}&appid=${weatherApiKey}`);
  } catch {
    throw "An error has occured while fetching Forecast";
  }

  const respData = (await resp.json()) as Forecast;
  return respData;
}