import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const paperStyles = {
  padding: '10px 10px',
  width: '100%',
  height: '400px',
};
const imgCardStyles = { width: '70%', height: '150px' };

export default function ItemShop(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container>
          <Paper elevation={10} style={paperStyles}>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              item
              xs={12}
            >
              <span>{`${props.data.category}`}</span>
              <h4>{`${props.data.title}`}</h4>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
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
              {`${props.data.price.toFixed(2)} €`}
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
              {`${
                props.data.quantity > 0 ? props.data.quantity : 'Out fo stock'
              }`}
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={2}
              >
                <TextField
                  hiddenLabel
                  id="quantity"
                  defaultValue="0"
                  variant="standard"
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  size="small"
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                item
                xs={2}
              >
                <Button variant="contained">buy</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
