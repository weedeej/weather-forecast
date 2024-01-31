import { apiBaseUrl, weatherApiKey } from "../constants";
import { GeoData } from "../types";

export async function getLongLat(cityName: string) {
  let res: Response | undefined;
  try {
    res = await fetch(`${apiBaseUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherApiKey}`);
  } catch {
    throw "An Error has occured while fetching City";
  }
  const respData = (await res.json()) as GeoData;
  return respData;
}