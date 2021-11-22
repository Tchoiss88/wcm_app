import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/actions/index';

const paperStyles = {
  padding: '10px 10px',
  width: '100%',
  height: '400px',
};
const imgCardStyles = { width: '70%', height: '150px' };

export default function ItemShop(props) {
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);

  let quantity = 1;
  const handleChange = (e) => {
    e.target.value;
    console.log(e.target.value, 'target', props.data.id);
  };

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
              <span>{`${props.data.category.toUpperCase()}`}</span>
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
              {`${props.data.quantity > 0 ? 'In stock' : 'Out fo stock'}`}
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
                  disabled={Boolean(!props.data.quantity)}
                  defaultValue="1"
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
                <Button
                  disabled={Boolean(!props.data.quantity)}
                  variant="contained"
                  onClick={() => {
                    dispatch(addItem(props.data));
                  }}
                >
                  buy
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
