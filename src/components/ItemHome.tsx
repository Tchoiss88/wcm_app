import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const paperStyles = { cursor: 'pointer', padding: '0 10px', width: '90%' };
const imgCardStyles = { width: '100%', height: '280px' };

const ItemHome = (props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Paper elevation={10} style={paperStyles}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item
                xs={12}
              >
                <h2>{`${props.data.category}`}</h2>
              </Grid>

              <img
                style={imgCardStyles}
                src={`${props.data.image}`}
                alt="category image"
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ItemHome;
