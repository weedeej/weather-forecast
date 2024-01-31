import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";

export function Landing() {
  const {isAuthenticated} = useAuth0();

  const text = !isAuthenticated ?
    "Welcome to the weather forecast web application. Please login with your Github user to use the application and view the weather in your city." :
    "Welcome to the weather forecast web application. You can search cities in your Home/Dashboard."
  return (
    <Typography variant="h6">
      {text}
    </Typography>
  )
}