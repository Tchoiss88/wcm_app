import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ItemShop from 'src/components/ItemShop';
import useStore from '../../lib/store';

export default function Shop() {
  const stock = useStore((state) => state.stock);
  const [radioCategory, setRadioCategory] = useState('all');
  const [filterStock, setFilterStock] = useState(stock);

  // to put react to update immediate
  useEffect(() => {
    if (radioCategory !== 'all') {
      filterStockWithRadioButton();
    } else {
      setFilterStock(stock);
    }
  }, [radioCategory]);

  // create an array of all the categories to render on the home page and will filter the stock
  const categories = [
    ...new Set(
      stock.filter((item) => item.category).map((item) => item.category)
    ),
  ];

  // function to filter by category choose by the user
  function filterStockWithRadioButton() {
    if (radioCategory !== 'all') {
      console.log(stock);
      const itemsByCategory = stock.filter((item) => {
        return item.category === radioCategory;
      });
      setFilterStock(itemsByCategory);
    }
  }
  return (
    <Container>
      <Grid container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          item
          xs={12}
        >
          <h2> Categories</h2>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
        >
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="category"
              name="row-radio-buttons-group"
              value={radioCategory}
              onChange={(e) => {
                setRadioCategory(e.target.value);
                // filterStockWithRadioButton();
              }}
            >
              {categories.map((item, i) => (
                <FormControlLabel
                  value={`${item}`}
                  control={<Radio />}
                  label={`${item.toUpperCase()}`}
                  key={i}
                />
              ))}
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="All CATEGORIES"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          item
          xs={12}
        >
          <h3> Have a good shopping time with us!</h3>
        </Grid>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 5, md: 5 }}
            columns={{ xs: 8, sm: 4, md: 10 }}
          >
            {filterStock.map((item, i) => (
              <Grid item xs={2} sm={4} md={3} key={i}>
                <ItemShop data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}
