import { useAuth0 } from "@auth0/auth0-react"
import { CircularProgress, Stack, Typography } from "@mui/material";

export function HomeContent () {
  const {user} = useAuth0();
  if (!user) {
    window.location.reload();
    return <CircularProgress/>
  }
  const {name, nickname} = user;
  return (
    <Stack gap={2}>
      <Typography fontWeight={700}>{name}</Typography>
      <Typography fontWeight={700}>https://github.com/{nickname}</Typography>
    </Stack>
  )
}