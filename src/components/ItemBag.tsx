import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const paperStyles = { padding: '10px 10px', width: '100%' };
const imgCardStyles = { width: '70%', height: '60px' };
const hoverStyles = { cursor: 'pointer' };

export default function ItemBag() {
  //itemImage, price, itemName, quantity

  let itemImage = 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e';
  let price = 111;
  let itemName = 'hat';

  const [count, setCount] = React.useState(1);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      item
      xs={12}
    >
      <Paper elevation={10} style={paperStyles}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          item
          xs={12}
        >
          <Grid>
            <img style={imgCardStyles} src={`${itemImage}`} alt="" />
          </Grid>
          <Grid>{itemName}</Grid>
          <Grid>
            <RemoveIcon
              style={hoverStyles}
              onClick={() => {
                setCount(Math.max(count - 1, 0));
              }}
            />
          </Grid>
          <Grid>{count}</Grid>
          <Grid>
            <AddIcon
              style={hoverStyles}
              onClick={() => {
                setCount(count + 1);
              }}
            />
          </Grid>
          <Grid>
            <span>Price:</span>
          </Grid>
          <Grid>{`${price.toFixed(2)} €`}</Grid>
          <Grid>
            <DeleteIcon style={hoverStyles} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
