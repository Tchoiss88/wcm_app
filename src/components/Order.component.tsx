import * as React from 'react';
import { Box, Container, Grid, Button, Paper } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Payment In Process',
  'Payed',
  'Shipped',
  'In Delivery',
  'Delivered',
];

interface Order {
  _id: string;
  email: string;
  fullName: string;
  createDate: Date;
  deliveryDate: Date;
  orderState: number;
  orderItem: [];
  orderSummary: {};
}

const paperStyles = { padding: '30px 20px', width: 1000, margin: '20px auto' };

function OrderComponent(props) {
  function createDateConvert(timestamp) {
    let dateObj = new Date(timestamp);
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let date = dateObj.getDate();

    return `${date}/${month}/${year}`;
  }
  // the function receive a timestamp add 5 days to estimate delivery
  function deliveryDateConvert(timestamp) {
    let dateObj = new Date(timestamp);
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let date = dateObj.getDate() + 3;

    return `${date}/${month}/${year}`;
  }

  let createDate = createDateConvert(props.data.createDate);
  let deliveryDate = deliveryDateConvert(props.data.deliveryEstimatedDate);

  return (
    <>
      <Container>
        <Paper elevation={10} style={paperStyles}>
          {/* This two button only the worker can see */}
          {/* <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button variant="contained">Accept Cancellation</Button>
            <Button variant="contained">Next State</Button>
          </Grid> */}
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
            xs={4}
          >
            <h3>Order ID:</h3>
            <h3>{`${props.data._id}`}</h3>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Stepper
                activeStep={+`${props.data.orderState}`}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
            xs={12}
          >
            <h3>{`${props.data.fullName}`}:</h3>
            <h3>{`${props.data.email}`}</h3>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
            xs={12}
          >
            <span>{`Date: ${createDate}`}</span>
            <span>{`Est. Delivery: ${deliveryDate}`}</span>
            <span>{`+34 ${props.data.cellphone}`}</span>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
            xs={12}
          >
            <span>{`Items price: ${props.data.orderSummary.itemsPrice.toFixed(
              2
            )} €`}</span>
            <span>{`Delivery cost: ${
              props.data.orderSummary.deliveryCost === 'Free'
                ? 'Free'
                : props.data.orderSummary.deliveryCost.toFixed(2)
            }`}</span>
            <span>{`Total price: ${props.data.orderSummary.total.toFixed(
              2
            )} €`}</span>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button variant="contained">Cancel order</Button>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default OrderComponent;
