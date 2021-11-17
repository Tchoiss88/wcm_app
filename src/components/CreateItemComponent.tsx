'use strict';
import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import styles from 'styles/CreateUser.module.css';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';

interface State {
  _id?: string;
  category: string;
  name: string;
  root_name: string;
  gender: string;
  price: number;
  quantity: number;
  insertDate: Date | null;
  url?: string;
  description: string;
  size?: string;
}

const initialFormValues = {
  category: '',
  name: '',
  root_name: '',
  gender: '',
  price: 0,
  quantity: 1,
  insertDate: null,
  url: '',
  description: '',
  size: '',
};

const genders = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
];

const sizes = [
  {
    value: 'extra small',
    label: 'XS = 32 - 36',
  },
  {
    value: 'small',
    label: 'S = 36 - 40',
  },
  {
    value: 'medium',
    label: 'M  = 40 - 44',
  },
  {
    value: 'large',
    label: 'L = 44 - 48',
  },
  {
    value: 'extra large',
    label: 'XL = 48 - 52',
  },
  {
    value: 'extra extra large',
    label: 'XXL = 52 - 56',
  },
];

export default function CreateUserComponent() {
  const [values, setValues] = React.useState<State>(initialFormValues);
  const [errors, setErrors] = React.useState<State>();

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      // FIXME
      setValues({ ...values, [prop]: event.target.value });
      setErrors({ value });

      // phone number validation
      let price = new RegExp(/^\d*$/).test(values.price);
      let quantity = new RegExp(/^\d*$/).test(values.quantity);
      if (!price) {
        setErrors({ price: 'Only numbers are permitted' });
      }
      if (!quantity) {
        setErrors({ quantity: 'Only numbers are permitted' });
      }
    };

  const paperStyles = { padding: '30px 20px', width: 750, margin: '10px auto' };

  return (
    <Container className={styles.page}>
      <form>
        <Paper
          component="form"
          noValidate
          autoComplete="off"
          elevation={10}
          style={paperStyles}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <h2>Create Item</h2>
                <Avatar sx={{ width: 70, height: 70 }}>
                  <AddCircleOutlineIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  label="Category:"
                  id="category"
                  value={values.category}
                  onChange={handleChange('category')}
                  inputProps={{
                    inputMode: 'text',
                    maxLength: 70,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name:"
                  id="name"
                  value={values.name}
                  variant="standard"
                  onChange={handleChange('name')}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  label="Description:"
                  id="description"
                  inputProps={{
                    maxLength: 200,
                  }}
                  value={values.description}
                  onChange={handleChange('description')}
                />
              </Grid>

              <Grid item xs={6}>
                {' '}
                <TextField
                  fullWidth
                  id="price"
                  label="Price:"
                  value={values.price}
                  variant="standard"
                  onChange={handleChange('price')}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '/^d*$/',
                    maxLength: 15,
                  }}
                  error={Boolean(errors?.price)}
                  helperText={errors?.price}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="quantity"
                  label="Quantity:"
                  value={values.quantity}
                  variant="standard"
                  onChange={handleChange('quantity')}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '/^d*$/',
                    maxLength: 15,
                  }}
                  error={Boolean(errors?.quantity)}
                  helperText={errors?.quantity}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  select
                  label="Gender"
                  value={values.gender}
                  onChange={handleChange('gender')}
                  variant="standard"
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="size"
                  select
                  label="Size"
                  value={values.size}
                  onChange={handleChange('size')}
                  variant="standard"
                >
                  {sizes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                xs={4}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  fullWidth
                  required
                  id="insertDate"
                  label="Insert Date"
                  type="date"
                  defaultValue="2001-11-21"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={values.insertDate}
                  onChange={handleChange('insertDate')}
                  variant="standard"
                />
              </Grid>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button variant="contained">Submit</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
    </Container>
  );
}
