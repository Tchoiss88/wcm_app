'use strict';
import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import styles from 'styles/CreateUser.module.css';
import MenuItem from '@mui/material/MenuItem';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export default function CreateItemComponent(props) {
  // My values
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [size, setSize] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      title,
      category,
      description,
      gender,
      image,
      price: parseInt(price),
      quantity: parseInt(quantity),
      sizes: [
        {
          size: size,
          quantity: parseInt(quantity),
        },
      ],
    };

    try {
      const response = await axios.post(`http://localhost:3000/api/item`, data);
      alert('The item was created successfully');

      setTitle('');
      setCategory('');
      setDescription('');
      setImage('');
      setGender('');
      setPrice('');
      setQuantity('');
      setSize('');
      //
    } catch (err) {
      alert(err.response.data.error);
    }
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
                <h2>Create Item </h2>
              </Grid>

              <Grid item md={12}>
                <TextField
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title:"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category:"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  type="text"
                  value={description}
                  label="Description:"
                  onChange={(e) => setDescription(e.target.value)}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  type="text"
                  value={image}
                  label="Image:"
                  onChange={(e) => setImage(e.target.value)}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  type="number"
                  label="Price:"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="standard"
                  fullWidth
                />
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
                    <MenuItem value={'others'}>Don't mather</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={4}>
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

              <Grid item md={6}>
                <TextField
                  type="number"
                  label="Quantity:"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  variant="standard"
                  fullWidth
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
                  Save Item
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </form>
    </>
  );
}
