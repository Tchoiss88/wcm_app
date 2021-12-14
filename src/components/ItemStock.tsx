import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const paperStyles = { padding: '10px 10px', width: '100%', height: '500px' };
const imgCardStyles = { width: '100%', height: '200px' };

export default function ItemStock(props) {
  const [showAddField, setShowAddField] = React.useState(false);
  const [size, setSize] = React.useState('');
  const [quantity, setQuantity] = React.useState('');

  const toggleShowAddField = () => {
    setShowAddField(!showAddField);
  };

  const deleteItem = async (e) => {
    e.preventDefault();

    try {
      if (window.confirm('Are you sure you want to delete the item')) {
        const response = await axios
          .delete(`http://localhost:3000/api/item/${props.data._id}`)
          .then((response) => {
            response.status;
          });

        window.location.reload(false);
      }
    } catch {
      alert('Can not delete the Item');
      return;
    }
  };

  //TODO
  const updateItem = async (e) => {
    e.preventDefault();
    let id = props.data._id;

    try {
      if (props.data.orderState < 5) {
        const response = await axios
          .patch(`http://localhost:3000/api/item/${props.data._id}`, {
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
                <span>{`${props.data._id}`}</span>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                xs={12}
              >
                <Button variant="contained" onClick={toggleShowAddField}>
                  Add
                </Button>
                <Button variant="contained" onClick={deleteItem}>
                  Remove
                </Button>
              </Grid>

              {showAddField && (
                <>
                  <Grid>
                    <span>
                      ------------------------------------------------------------
                    </span>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    xs={12}
                  >
                    <Grid item md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="size">Size</InputLabel>
                        <Select
                          variant="standard"
                          value={size}
                          onChange={(event: SelectChangeEvent) => {
                            setSize(event.target.value as string);
                          }}
                        >
                          <MenuItem value={'xs'}>XS - 30 - 32</MenuItem>
                          <MenuItem value={'s'}>S - 34 - 36</MenuItem>
                          <MenuItem value={'m'}>M - 38 - 40</MenuItem>
                          <MenuItem value={'l'}>L - 42- 44</MenuItem>
                          <MenuItem value={'xl'}>XL - 46 - 48</MenuItem>
                          <MenuItem value={'xxl'}>XXL - 50 - 52 </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                        type="number"
                        label="Quantity:"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Button variant="contained">Save</Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
