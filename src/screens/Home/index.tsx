import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { HomeContent, Landing, Weather } from "./Content";

enum PageContent {
  LANDING,
  HOME,
  WEATHER
}

export function Home() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [content, setContent] = useState<PageContent>(PageContent.LANDING);

  let main = <></>;
  switch (content) {
    case PageContent.HOME:
      main = <HomeContent/>
      break;
    case PageContent.WEATHER:
      main = <Weather/>
      break;
    default:
      main = <Landing />
      break;
  }

  function onHomeClick() {
    setContent(PageContent.HOME);
  }

  function onWeatherClick() {
    setContent(PageContent.WEATHER);
  }

  function onBackClick() {
    setContent(PageContent.LANDING);
  }

  function onLoginClick() {
    loginWithRedirect();
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
          {(isAuthenticated && content !== PageContent.WEATHER) && <Button variant="contained" onClick={onWeatherClick}>Weather</Button>}
        </Stack>
      </Stack>
    </Stack>
  );
}