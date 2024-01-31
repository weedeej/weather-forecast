import { Container, Stack } from "@mui/material";
import { NavBar } from "./NavBar";

export function Layout(props: { children: React.ReactNode }) {
  return (<Stack gap={2} alignItems="center">
    <NavBar />
    <Container maxWidth="md">
      {props.children}
    </Container>
  </Stack>)
}