import * as React from 'react';


import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material';
import { downloadNewCsvFile } from './allFunction';

import FileDownloadIcon from '@mui/icons-material/FileDownload';


export default function BasicTable(props) {

  return (
    <div>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>country</TableCell>
            <TableCell>state</TableCell>
            <TableCell>city</TableCell>
            <TableCell>zip code</TableCell>
            <TableCell>temp</TableCell>
            <TableCell>wind_speed</TableCell>
            <TableCell>clouds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.allCity.map((row) => (
            <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell>{row.country}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row["zip code"]}</TableCell>
              <TableCell>{row.temp}</TableCell>
              <TableCell>{row.wind_speed}</TableCell>
              <TableCell>{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <IconButton>
        <FileDownloadIcon  color="primary" sx={{height: "72px", width:"72px"}} onClick={()=>{downloadNewCsvFile(allCity)}}/>
    </IconButton>

    </div>
  );
}