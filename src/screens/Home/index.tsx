import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { HomeContent, Landing, Weather } from "./Content";
import { Forecast } from "../../types";

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

  let main = <></>;
  switch (content) {
    case PageContent.HOME:
      main = <HomeContent setWeatherForecast={updateWeatherForecast}/>
      break;
    case PageContent.WEATHER:
      main = <Weather forecast={weatherForecast}/>
      break;
    default:
      main = <Landing />
      break;
  }
  
  if (isLoading) return <CircularProgress/>;
  return (
    <Stack gap={2}>
      {main}
      <Stack direction="row" justifyContent="space-between" width="100%">
        {!isAuthenticated && <Button variant="outlined" onClick={onLoginClick}>Login</Button>}
        {(isAuthenticated && content !== PageContent.LANDING) && <Button variant="outlined" onClick={onBackClick}>Landing</Button>}
        <Stack direction="row" gap={2}>
          {(isAuthenticated && content !== PageContent.HOME) && <Button variant="contained" onClick={onHomeClick}>Home</Button>}
        </Stack>
      </Stack>
    </Stack>
  );
}