import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Box, Paper, Button } from '@mui/material';
import ItemBag from 'src/components/ItemBag';
import styles from 'styles/ShopBag.module.css';

export default function ShopBag() {
  let item = 99;
  const delivery = item < 100 ? 5 : 0;
  const total = item + delivery;

  const dispatch = useDispatch();

  // const itemToBy = useSelector((state) => state);

  // console.log(itemToBy, 'itemBag');

  const paperStyles = {
    padding: '10px 10px',
    width: '280px',
    position: 'fixed',
  };

  return (
    <Container className={styles.page}>
      <Grid container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
        >
          <h1> My Shopping Bag</h1>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          item
          xs={8}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 1 }}
            >
              {Array.from(Array(4)).map((_, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <ItemBag />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          item
          xs={4}
        >
          <Paper elevation={10} style={paperStyles}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              item
              xs={12}
            >
              {/* Summary box */}

              <Grid item xs={12}>
                <h2>Summary</h2>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                item
                xs={12}
              >
                <h3>{`Item(s):`}</h3>
                <h3>{`${item.toFixed(2)} €`}</h3>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                item
                xs={12}
              >
                <h3>{`Est. Delivery:`}</h3>
                <h3>{`${delivery ? `${delivery.toFixed(2)} €` : 'Free'}`}</h3>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                item
                xs={12}
              >
                <h2>{`Est. Total:`}</h2>
                <h3>{`${total.toFixed(2)} €`}</h3>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item
                xs={12}
              >
                <Button variant="contained">checkout</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
