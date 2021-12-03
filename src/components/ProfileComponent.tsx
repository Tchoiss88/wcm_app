'use strict';
import * as React from 'react';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';

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
  cellphone?: number;
  address: string;
  userType: string;
  birthDate: Date | null;
  gender: string;
  showPassword: boolean;
  worker: boolean;
  hoursForWeek?: { id: string; hours: number }[];
}


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

const users = [
  {
    value: 'worker',
    label: 'Worker',
  },
  {
    value: 'client',
    label: 'Customer',
  },
];

export default function ProfileComponent(props) {
  // My values
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [birthDate, setBirthDate] = React.useState(0);
  const [cellphone, setCellphone = React.useState(0);
  const [workHoursWeekly, setWorkHoursWeekly] = React.useState('');
  const showContact=false;
  const [showPassword, setShowPassword] = React.useState('false');

  const [errors, setErrors] = React.useState();
  const [loggedUserWithoutAccount, setLoggedUserWithoutAccount] =
    React.useState(false);

  const [session, loading] = useSession();

  const { data, error } = useSWR(
    !loggedUserWithoutAccount && !loading
      ? `/api/user/${session?.user.email}`
      : null,
    api
  );

  React.useEffect(() => {
    if (error) setLoggedUserWithoutAccount(true);
  }, [error]);

  // const handleChange =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const {
  //       target: { value },
  //     } = event;

  //     // FIXME
  //     setValues({ ...values, [prop]: event.target.value });
  //     setErrors({ value });

  //     // phone number validation
  //     let phoneValidation = new RegExp(/^\d*$/).test(values.phoneNumber);
  //     if (!phoneValidation) {
  //       setErrors({ phoneNumber: 'Only numbers are permitted' });
  //     }
  //   };

  // hide/ show the password value
  const handleClickShowPassword = () => {
    setShowPassword('true');
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // TODO handle submit button

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      fullName,
email, 
address,
gender,
userType, 
password,
confirmPassword,
birthDate, 
cellphone, 
workHoursWeekly,
showContact,
showPassword, 
    }

    console.log(data, 'values');
  };

  const paperStyles = { padding: '30px 20px', width: 750, margin: '10px auto' };

  return (
    <Container className={styles.page}>
      <form onSubmit={handleSubmit}>
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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  inputProps={{
                    inputMode: 'text',
                    maxLength: 70,
                  }}
                  error={Boolean(fullName)}
                  helperText={fullName}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  label="Email:"
                  id="email"
                  value={email}
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{
                    pattern:
                      '/^([a-zA-Z0-9._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/',
                    maxLength: 50,
                  }}
                  error={Boolean(email)}
                  helperText={email}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number:"
                  value={cellphone}
                  variant="standard"
                  onChange={(e) => setCellphone(e.target.value)}
                  inputProps={{
                    inputMode: 'numeric',
                    // pattern: '/^d*$/',
                    maxLength: 15,
                  }}
                  error={Boolean(cellphone)}
                  helperText={cellphone}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
              </Grid>

              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  variant="standard"
                  onChange{() => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
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
                  id="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  variant="standard"
                  onChange={handleChange('confirmPassword')}
                  error={Boolean(confirmPassword)}
                  helperText={confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
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
                  id="userType"
                  select
                  label="User Type"
                  value={userType}
                  onChange={handleChange('userType')}
                  variant="standard"
                >
                  {users.map((option) => (
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
                  id="gender"
                  select
                  label="Gender"
                  value={gender}
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
                  value={workHoursWeekly}
                  onChange={handleChange('workHoursWeekly')}
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
                  value={birthDate}
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
                <Button type="submit" variant="contained">
                  save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </form>
    </Container>
  );
}
