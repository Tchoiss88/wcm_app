import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import ItemStock from 'src/components/ItemStock';

export default function Stock() {
  return (
    <Container>
      <Grid container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
        >
          <h1> Stock</h1>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(8)).map((_, index) => (
              <Grid item xs={2} sm={3} md={3} key={index}>
                <ItemStock />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}
