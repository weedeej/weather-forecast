import { useAuth0 } from "@auth0/auth0-react"
import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { Forecast } from "../../../types";
import { useState } from "react";
import { fetchForecast } from "../../../utils";

type HomeContentProps = {
  setWeatherForecast: (forecast: Forecast | null) => void;
  displayWeather: () => void;
}
export function HomeContent (props: HomeContentProps) {
  const {setWeatherForecast, displayWeather} = props;
  const [cityInput, setCityInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {user, isAuthenticated} = useAuth0();

  if (!isAuthenticated || !user) {
    window.location.reload();
    return <CircularProgress/>
  }
  const {name, nickname} = user;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cityInput) return;
    setIsLoading(true);
    fetchForecast(cityInput)
      .then(setWeatherForecast)
      .catch(alert)
      .finally(() => {
        setIsLoading(false);
        displayWeather();
      });
  }

  return (
    <Stack gap={1} alignItems="center">
      <Typography fontWeight={700}>{name}</Typography>
      <Typography fontWeight={700}>https://github.com/{nickname}</Typography>
      <form onSubmit={onSubmit}>
        <Stack gap={2}>
          <TextField label="City" placeholder="Input City Name" onChange={(e) => setCityInput(e.target.value)}/>
          <Button type="submit" variant="contained" disabled={isLoading} startIcon={isLoading && <CircularProgress size={16}/>}>Display Weather</Button>
        </Stack>
      </form>
    </Stack>
  )
}