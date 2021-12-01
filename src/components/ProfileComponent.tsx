'use strict';
import * as React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  address: string;
  birthDate: Date | null;
  gender: string;
  showPassword: boolean;
  worker: boolean;
  hoursForWeek?: { id: string; hours: number }[];
}

const initialFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  address: '',
  birthDate: null,
  gender: '',
  showPassword: false,
  worker: true,
  hoursForWeek: [],
};

const hoursToWorkForWeek = [
  {
    value: 40,
    label: 'Full Time 8h for day',
  },
  {
    value: 30,
    label: 'Part-Time 6h for day',
  },
  {
    value: 25,
    label: 'Part-Time 5h for day',
  },
  {
    value: 20,
    label: 'Part-Time 4h for day',
  },
];
const genders = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'others',
    label: 'Others',
  },
];

export default function ProfileComponent(props) {
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
      let phoneValidation = new RegExp(/^\d*$/).test(values.phoneNumber);
      if (!phoneValidation) {
        setErrors({ phoneNumber: 'Only numbers are permitted' });
      }
    };

  // hide/ show the password value
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid
                item
                xs={6}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <h2>Profile</h2>
                <Avatar sx={{ width: 70, height: 70 }}>
                  <AddCircleOutlineIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  label="Full Name:"
                  id="fullName"
                  value={values.fullName}
                  onChange={handleChange('fullName')}
                  inputProps={{
                    inputMode: 'text',
                    maxLength: 70,
                  }}
                  error={Boolean(errors?.fullName)}
                  helperText={errors?.fullName}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  label="Email:"
                  id="email"
                  value={values.email}
                  variant="standard"
                  onChange={handleChange('email')}
                  inputProps={{
                    pattern:
                      '/^([a-zA-Z0-9._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/',
                    maxLength: 50,
                  }}
                  error={Boolean(errors?.email)}
                  helperText={errors?.email}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number:"
                  value={values.phoneNumber}
                  variant="standard"
                  onChange={handleChange('phoneNumber')}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '/^d*$/',
                    maxLength: 15,
                  }}
                  error={Boolean(errors?.phoneNumber)}
                  helperText={errors?.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="standard"
                  label="Address:"
                  id="address"
                  inputProps={{
                    maxLength: 100,
                  }}
                  value={values.address}
                  onChange={handleChange('address')}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="standard"
                  onChange={handleChange('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  variant="standard"
                  onChange={handleChange('confirmPassword')}
                  error={Boolean(errors?.confirmPassword)}
                  helperText={errors?.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  required
                  fullWidth
                  id="hoursWeek"
                  select
                  label="Hours For Day "
                  value={values.hoursForWeek}
                  onChange={handleChange('hoursForWeek')}
                  variant="standard"
                >
                  {hoursToWorkForWeek.map((option) => (
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
                  id="birthDate"
                  label="Birthday"
                  type="date"
                  defaultValue="2001-11-21"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={values.birthDate}
                  onChange={handleChange('birthDate')}
                  variant="standard"
                />
              </Grid>
              <Grid
                item
                xs={4}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button variant="contained">edit</Button>
                <Button variant="contained">save</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
    </Container>
  );
}
