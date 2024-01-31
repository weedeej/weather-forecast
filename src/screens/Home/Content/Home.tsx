import { useAuth0 } from "@auth0/auth0-react"
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Link, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Forecast } from "../../../types";
import { useState } from "react";
import { fetchForecast } from "../../../utils";
import { IconBrandGithubFilled, IconSearch } from "@tabler/icons-react";
import { Weather } from "./Weather";

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
  const [isInPageRendering, setIsInpageRendering] = useState(false);
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
        if (!isInPageRendering) displayWeather();
      });
  }

  return (
    <Stack gap={1}>
      <Typography fontWeight={700}>Welcome Back, {name}!</Typography>
      <Stack direction="row" gap={1} alignItems="center">
        <Box sx={{display: {xs: "none", md: "block"}}}><IconBrandGithubFilled /></Box><Typography fontWeight={700}>Github: </Typography>
        <Link href={`https://github.com/${nickname}`} sx={{ textDecoration: "none" }}>
          <Typography>https://github.com/{nickname}</Typography>
        </Link>
      </Stack>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Stack gap={1} width="100%">
          <Stack direction="row" gap={2}>
            <TextField label="City" placeholder="Input City Name" onChange={(e) => setCityInput(e.target.value)} fullWidth />
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
          <Stack direction="row" gap={1} justifyContent="space-between" alignItems="center" flexWrap="wrap-reverse">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={16} /> : <IconSearch size={16} />}
              >
              Display Weather
            </Button>
            <FormControlLabel
              title="Renders the result in this page"
              control={<Checkbox value={isInPageRendering} onChange={(_, checked) => setIsInpageRendering(checked)} />}
              label={<Typography noWrap>In-Page Rendering</Typography>} />
          </Stack>
        </Stack>
      </form>
      {
        (isInPageRendering && forecast) && <Weather forecast={forecast} />
      }
    </Stack>
  )
}