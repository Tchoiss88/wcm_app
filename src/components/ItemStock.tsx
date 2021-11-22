import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const paperStyles = { padding: '10px 10px', width: '100%', height: '500px' };
const imgCardStyles = { width: '100%', height: '200px' };

export default function ItemStock(props) {
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
              <span>{`${props.data.category.toUpperCase()}`}</span>
              <h4>{`${props.data.title}`}</h4>
            </Grid>
            <Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                item
                xs={12}
              >
                <img style={imgCardStyles} src={`${props.data.image}`} alt="" />
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                item
                xs={12}
              >
                <span>Price:</span>
                <span>{`${props.data.price.toFixed(2)} €`}</span>
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
                <span>
                  {`${
                    props.data.quantity > 0
                      ? props.data.quantity
                      : 'Out fo stock'
                  }`}
                </span>
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
                <span>{`${props.data.id}`}</span>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                xs={12}
              >
                <Button variant="contained">Add</Button>
                <Button variant="contained">Remove</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
