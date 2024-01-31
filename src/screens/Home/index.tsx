import { useAuth0 } from "@auth0/auth0-react";
import { Button, CircularProgress, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { HomeContent, Landing, Weather } from "./Content";
import { Forecast } from "../../types";
import { IconHome, IconLogin2, IconNews } from "@tabler/icons-react";

enum PageContent {
  LANDING,
  HOME,
  WEATHER
}

export function Home() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [content, setContent] = useState<PageContent>(PageContent.LANDING);
  const [weatherForecast, setWeatherForecast] = useState<Forecast | null>(null);

  function onHomeClick() {
    setContent(PageContent.HOME);
  }

  function onBackClick() {
    setContent(PageContent.LANDING);
  }

  function onLoginClick() {
    loginWithRedirect();
  }

  function updateWeatherForecast(forecast: Forecast | null) {
    setWeatherForecast(forecast);
  }

  function displayWeather() {
    setContent(PageContent.WEATHER);
  }

  let main = <></>;
  switch (content) {
    case PageContent.HOME:
      main = <HomeContent setWeatherForecast={updateWeatherForecast} displayWeather={displayWeather} forecast={weatherForecast} />
      break;
    case PageContent.WEATHER:
      main = <Weather forecast={weatherForecast} />
      break;
    default:
      main = <Landing />
      break;
  }

  if (isLoading) return <CircularProgress />;
  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between" gap={2}>
        {
          isAuthenticated && (
            <Stack direction="row" width="100%" gap={0} alignItems="center" justifyContent="center">
              <Button variant={content === PageContent.LANDING ? "contained" : "text"} sx={{ borderRadius: 0 }} startIcon={<IconNews />} onClick={onBackClick}>LANDING</Button>
              <Button variant={content === PageContent.HOME ? "contained" : "text"} sx={{ borderRadius: 0 }} startIcon={<IconHome />} onClick={onHomeClick}>DASHBOARD</Button>
            </Stack>
          )
        }
        {!isAuthenticated && <Button variant="contained" startIcon={<IconLogin2 />} onClick={onLoginClick}>Login</Button>}
      </Stack>
      <Divider />
      {main}
    </Stack>
  );
}
