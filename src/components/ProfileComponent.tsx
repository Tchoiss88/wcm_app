'use strict';
import * as React from 'react';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import styles from 'styles/CreateUser.module.css';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuItem from '@mui/material/MenuItem';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export default function ProfileComponent(props) {
  // My values
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [cellphone, setCellphone] = React.useState('');
  const [workHoursWeekly, setWorkHoursWeekly] = React.useState('');

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      fullName,
      email,
      address,
      gender,
      userType,
      birthDate,
      cellphone,
      workHoursWeekly,
    };

    console.log(data, 'Data to submit');
  };

  const paperStyles = { padding: '30px 20px', width: 750, margin: '10px auto' };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center"
        noValidate
        autoComplete="off"
      >
        <Box className={styles.page}>
          <Paper elevation={10} style={paperStyles}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 4, md: 2 }}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid
                item
                md={6}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <h2>Profile</h2>
              </Grid>
              <Grid
                item
                md={6}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar sx={{ width: 70, height: 70 }}>
                  <AddCircleOutlineIcon />
                </Avatar>
              </Grid>
              <Grid item md={12}>
                <TextField
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Full Name:"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email:"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  type="text"
                  value={address}
                  label="Address:"
                  onChange={(e) => setAddress(e.target.value)}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  type="cellphone"
                  label="Cellphone:"
                  value={cellphone}
                  onChange={(e) => setCellphone(e.target.value)}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth>
                  <InputLabel id="userType">User type</InputLabel>
                  <Select
                    variant="standard"
                    value={userType}
                    onChange={(event: SelectChangeEvent) => {
                      setUserType(event.target.value as string);
                    }}
                  >
                    <MenuItem value={'client'}>Client</MenuItem>
                    <MenuItem value={'worker'}>Worker</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    variant="standard"
                    value={gender}
                    onChange={(event: SelectChangeEvent) => {
                      setGender(event.target.value as string);
                    }}
                  >
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'others'}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {userType === 'worker' && (
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="workHoursWeekly">Hours / day</InputLabel>
                    <Select
                      variant="standard"
                      value={workHoursWeekly}
                      onChange={(event: SelectChangeEvent) => {
                        setWorkHoursWeekly(event.target.value as string);
                      }}
                    >
                      <MenuItem value={40}>Full time 8h /day</MenuItem>
                      <MenuItem value={30}>Part time 6h /day</MenuItem>
                      <MenuItem value={25}>part time 5h /day</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid item md={6}>
                <TextField
                  fullWidth
                  required
                  id="birthDate"
                  label="Birthday"
                  type="date"
                  defaultValue="1994-01-01"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setBirthDate(e.target.value)}
                  variant="standard"
                />
              </Grid>
              <Grid
                item
                md={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button variant="contained" type="submit">
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </form>
    </>
  );
}
