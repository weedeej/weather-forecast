import { useAuth0 } from "@auth0/auth0-react";
import { Forecast } from "../../../types"
import { CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

type WeatherProps = {
  forecast: Forecast | null
}

export function Weather(props: WeatherProps) {
  const { forecast } = props;
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    window.location.reload();
    return <CircularProgress />
  }
  if (!forecast) {
    return <CircularProgress />
  }

  const { list } = forecast;
  return (
    <Stack gap={2}>
      <Typography variant="h5" fontWeight={700}>
        Weather forecast for {forecast.city.name}, {forecast.city.country}
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: "inherit", overflowY: "auto" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date (mm/dd/yyyy hh:mm:ss)</TableCell>
              <TableCell align="right">Temp (F)</TableCell>
              <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Description</TableCell>
              <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Main</TableCell>
              <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Pressure</TableCell>
              <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>Humidity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(({ dt_txt, main, weather }) => (
              <TableRow
                key={dt_txt}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dt_txt}
                </TableCell>
                <TableCell align="right">{main.temp}</TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>{weather[0].description}</TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>{weather[0].main}</TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>{main.pressure}</TableCell>
                <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>{main.humidity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export {} // for --isolatedModules error