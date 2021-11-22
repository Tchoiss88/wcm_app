import * as React from 'react';
import { Box, Container, Grid, Button, Paper } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useStore from '../../lib/store';

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

const createOrder = (arr, order: Order) => {};

function OrderComponent(props) {
  return (
    <>
      <Container>
        <Paper elevation={10} style={paperStyles}>
          {/* This two button only the worker can see */}
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button variant="contained">Accept Cancellation</Button>
            <Button variant="contained">Next State</Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
            xs={4}
          >
            <h3>Order ID:</h3>
            <h3>0025gd151dsg1sdg515</h3>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={3} alternativeLabel>
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
            <h3>User Full Name:</h3>
            <h3>User Email:</h3>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            item
            xs={12}
          >
            <span>Create Date:</span>
            <span>Est. Delivery:</span>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button variant="contained">Cancel order</Button>
            <Button variant="contained">Order Detail</Button>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default OrderComponent;
