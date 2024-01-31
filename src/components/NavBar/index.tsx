import { Button, Divider, IconButton, Stack, Typography, colors } from "@mui/material";
import { useAuth0 } from '@auth0/auth0-react';
import { IconLogout2 } from "@tabler/icons-react";

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="nowrap" rowGap={2}>
          <Stack direction="row" gap={2} alignItems="center">
            <img src="/images/logo.png" width={103} height={46} alt="logo" />
            <Typography variant="h5" fontWeight={700}>
              Weather Forecast
            </Typography>
          </Stack>
          { isAuthenticated && (<>
            <Button color="error" variant="contained" onClick={onLogout} sx={{display: {xs: "none", sm: "inline-flex"}}}>Logout</Button>
            <IconButton
            color="error"
            onClick={onLogout}
            sx={{
              display: {xs: "inline-flex", sm: "none"},
              backgroundColor: colors.red[100],
              borderRadius: 1
              }}><IconLogout2/></IconButton>
          </>) }
        </Stack>
        <Divider/>
      </Stack>
    </>
  )
}