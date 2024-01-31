import { Button, Divider, Stack, Typography } from "@mui/material";
import { useAuth0 } from '@auth0/auth0-react';

export function NavBar() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  function onLogout() {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  return (
    <>
      <Stack gap={2} p={1} width="100%">
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" rowGap={2}>
          <Stack direction="row" gap={2} alignItems="center">
            <img src="/images/logo.png" width={103} height={46} alt="logo" />
            <Typography variant="h5">
              Weather Forecast
            </Typography>
          </Stack>
          { isAuthenticated && <Button color="error" variant="contained" onClick={onLogout}>Logout</Button> }
        </Stack>
        <Divider/>
      </Stack>
    </>
  )
}