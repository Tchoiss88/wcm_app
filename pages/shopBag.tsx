import * as React from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import api from 'utils/api';
import { signIn, useSession } from 'next-auth/client';
import { Container, Grid, Box, Paper, Button } from '@mui/material';
import ItemBag from 'src/components/ItemBag';

import styles from 'styles/ShopBag.module.css';

export default function ShopBag() {
  const [session] = useSession();

  const { data } = useSWR(
    `/api/user/${session ? session.user.email : ''}`,
    api
  );

  // FIXME save the array in the local store on a click
  // let itemsInBag = useSelector((state) => state);

  // window.localStorage.setItem('shopBagItems', itemsInBag);

  // window.localStorage.getItem('shopBagItems');

  const itemToBuy = useSelector((state) => state);

  const itemsTotalPrice = calculatedItemsTotalPrice();

  const delivery = calculatedDelivery();

  const total = calculatedTotal();

  const paperStyles = {
    padding: '10px 10px',
    width: '280px',
    position: 'fixed',
  };

  function calculatedItemsTotalPrice() {
    let som = 0;
    itemToBuy.map((item, i) => {
      som = som + item.price;
    });
    return som;
  }

  function calculatedDelivery() {
    if (itemsTotalPrice === 0) {
      return `${(0).toFixed(2)} €`;
    }
    if (itemsTotalPrice > 0 && itemsTotalPrice < 100) {
      return `${(5).toFixed(2)} €`;
    } else {
      return 'Free';
    }
  }

  function calculatedTotal() {
    if (delivery === 'Free' || delivery === `${(0).toFixed(2)} €`) {
      return itemsTotalPrice;
    } else if (delivery === `${(5).toFixed(2)} €`) {
      return itemsTotalPrice + 5;
    }
  }

  function handleClickCheckout() {
    let order;
    if (!session) {
      signIn('auth0');
      return;
    } else {
      order = {
        id: `${data.data.fullName.slice(0, 3)}${data.data.fullName.slice(
          -4,
          -1
        )}${Date.now()}`,
        email: data.data.email,
        fullName: `${data.data.fullName} `,
        createDate: Date.now(),
        deliveryDate: Date.now(),
        orderState: 0,
        orderItems: Array.from(itemToBuy),
        orderSummary: {
          itemsPrice: itemsTotalPrice,
          delivery: delivery,
          total: total,
        },
      };

      if (order.orderSummary.total > 0) {
        data.data.orders.push(order);
      }

      console.log(data.data, 'data', 'order', order);
    }
  }

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
          <h2> My Shopping Bag</h2>
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
              {/* FIXME */}
              {itemToBuy.map((itemBag, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                  <ItemBag data={itemBag} />
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
          {/* FIXME */}
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
                <h3>{`${(itemsTotalPrice ? itemsTotalPrice : 0).toFixed(
                  2
                )} €`}</h3>
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
                <h3>{delivery}</h3>
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
                <Button variant="contained" onClick={handleClickCheckout}>
                  checkout
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
