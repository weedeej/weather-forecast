import { Forecast } from "../../../types"

type WeatherProps = {
  forecast: Forecast | null
}

export function Weather(props: WeatherProps) {
  const {forecast} = props;
  console.log(forecast);
  return <>w</>
}