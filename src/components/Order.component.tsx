import * as React from 'react';
import { Box, Container, Grid, Button, Paper } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';
import OrderItemDetails from '../components/OrderItemDetails';
import axios from 'axios';

const steps = [
  'Payment In Process',
  'Payed',
  'Shipped',
  'In Delivery',
  'Delivered',
];

interface Order {
  id: string;
  email: string;
  cancellation: Boolean;
}

const paperStyles = { padding: '30px 20px', width: 1000, margin: '20px auto' };

function OrderComponent(props) {
  const [session] = useSession();
  const [showDetail, setShowDetail] = React.useState(false);
  const [canCancelResult, setCanCancelResult] = React.useState({});

  const toggleShowDetail = (e) => {
    e.preventDefault();

    if (showDetail) {
      setShowDetail(false);
      return;
    }
    if (!showDetail) {
      setShowDetail(true);
      return;
    }
  };

  const { data } = useSWR(`/api/user/${session?.user.email}`, api);
  const user = data?.data.userType;

  let createDate = createDateConvert(props.data.createDate);
  let deliveryDate = deliveryDateConvert(props.data.deliveryDate);

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

  let deliveryCost = () => {
    if (props.data.orderSummary.delivery !== 'Free') {
      return `${props.data.orderSummary.delivery.toFixed(2)} €`;
    } else {
      return 'Free';
    }
  };

  const cancelOrder = async (e) => {
    e.preventDefault();

    try {
      if (window.confirm('Are you sure you want to cancel the order')) {
        const response = await axios
          .delete(`http://localhost:3000/api/order/${canCancelResult.id}`, {
            data: { email: canCancelResult.email },
          })
          .then((response) => {
            response.status;
          });

        window.location.reload(false);
      }
    } catch {
      alert('Can not delete the order');
      return;
    }
  };

  const updateOrder = async (e) => {
    e.preventDefault();
    let id = props.data._id;

    try {
      if (props.data.orderState < 5) {
        const response = await axios
          .patch(`http://localhost:3000/api/order/${id}`, {
            orderState: props.data.orderState + 1,
            email: props.data.email,
          })
          .then((response) => {
            response.status;
          });

        window.location.reload(false);
      } else {
        return;
      }
    } catch {
      alert('Can not update the order');
      return;
    }
  };

  function canICancelThisOrder(e) {
    e.preventDefault();

    let orderToCancel = {
      id: props.data._id,
      email: props.data.email,
      cancellation: true,
    };

    setCanCancelResult(orderToCancel);
  }

  // console.log(props.data.orderItems, 'Items');

  return (
    <>
      <Container>
        <Paper elevation={10} style={paperStyles}>
          {user === 'worker' && (
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              {canCancelResult?.cancellation && (
                <Button variant="contained" onClick={cancelOrder}>
                  cancel order
                </Button>
              )}
              {canCancelResult?.cancellation !== true && (
                <Button variant="contained" onClick={updateOrder}>
                  Next State
                </Button>
              )}
            </Grid>
          )}

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
            <span>{`Delivery cost: ${deliveryCost()}`}</span>
            <span>{`Total price: ${props.data.orderSummary.total.toFixed(
              2
            )} `}</span>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button variant="contained" onClick={canICancelThisOrder}>
              Cancel order
            </Button>
            <Button variant="contained" onClick={toggleShowDetail}>
              Order Details
            </Button>
          </Grid>

          {showDetail && (
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <span>Items</span>
              {props.data.orderItems.map((item, i) => {
                <OrderItemDetails data={item} key={i} />;
              })}
            </Grid>
          )}
        </Paper>
      </Container>
    </>
  );
}

export default OrderComponent;
function setStatus(arg0: string): any {
  throw new Error('Function not implemented.');
}
