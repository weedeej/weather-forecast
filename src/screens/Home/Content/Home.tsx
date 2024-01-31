import { useAuth0 } from "@auth0/auth0-react"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Forecast } from "../../../types";
import { useState } from "react";
import { fetchForecast } from "../../../utils";
import { IconHelpCircleFilled, IconSearch } from "@tabler/icons-react";

type HomeContentProps = {
  setWeatherForecast: (forecast: Forecast | null) => void;
  displayWeather: () => void;
  forecast: Forecast | null;
}
export function HomeContent(props: HomeContentProps) {
  const { setWeatherForecast, displayWeather, forecast } = props;
  const [cityInput, setCityInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forecastLimit, setForecastLimit] = useState<number>(5);
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated || !user) {
    window.location.reload();
    return <CircularProgress />
  }
  const { name, nickname } = user;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cityInput) return;
    setIsLoading(true);
    fetchForecast(cityInput, forecastLimit)
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
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Stack gap={1} width="100%">
          <Stack direction="row" gap={2}>
            <TextField label="City" placeholder="Input City Name" onChange={(e) => setCityInput(e.target.value)} fullWidth/>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography fontWeight={700}>
                Limit:
              </Typography>
              <Select value={forecastLimit} onChange={(e) => setForecastLimit(e.target.value as number)}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <FormControlLabel title="Renders the result in this page" control={<Checkbox />} label="In-Page Rendering" />
            <Button type="submit" variant="contained" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={16}/> : <IconSearch size={16}/>}>Display Weather</Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}