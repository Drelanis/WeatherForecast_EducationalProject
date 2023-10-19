'use client';
import { FC } from 'react';
import { IForecastResponse } from '@lib/intarfaces';
import WeatherLoader from '../../common/WeatherLoader';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface IForecastTableProps {
  loading: boolean;
  forecastWeather: IForecastResponse | null;
}

const ForecastTable: FC<IForecastTableProps> = ({
  loading,
  forecastWeather,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Tempature</TableCell>
              <TableCell align="right">Feels like</TableCell>
              <TableCell align="right">Humidity</TableCell>
              <TableCell align="right">Pressure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecastWeather &&
              forecastWeather.list.map((weather) => (
                <TableRow
                  key={weather.dt_txt}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {weather.dt_txt}
                  </TableCell>
                  <TableCell align="right">{weather.main.temp}</TableCell>
                  <TableCell align="right">{weather.main.feels_like}</TableCell>
                  <TableCell align="right">{weather.main.humidity}</TableCell>
                  <TableCell align="right">{weather.main.pressure}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <WeatherLoader loading={loading} />
      </Box>
    </>
  );
};

export default ForecastTable;
