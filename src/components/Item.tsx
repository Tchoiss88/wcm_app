import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const paperStyles = { padding: '10px 10px', width: '100%' };
const imgCardStyles = { width: '100%', height: '200px' };
export default function Item() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container>
          <Paper elevation={10} style={paperStyles}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
            >
              <h2>Item Name</h2>
              <span>Category</span>
            </Grid>

            <img
              style={imgCardStyles}
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
              alt=""
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              item
              xs={12}
            >
              <span>Price:</span>
              <span>14.00€</span>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              item
              xs={12}
            >
              <span>Quantity:</span>
              <span>50 uds</span>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              item
              xs={12}
            >
              <span>Id:</span>
              <span>ds554sf4s545sa978e7f</span>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
