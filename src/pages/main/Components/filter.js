import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ItemContext } from '../../../context/context';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  filterBtn: {
       marginTop:"20px",
       marginRight:"10px"
  },
  sortBtn:{
      flex:"1",
      marginLeft:"5px"
  },
  sortContainer :{
      display:"flex"
  }
}));

 const Filter =() => {
  const {dispatch} = useContext(ItemContext)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const [sort, setSort] = React.useState('relevance');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  


  return (
    <div className={classes.sortContainer}>
      <div className={classes.sortBtn}>
      <FormControl className={classes.formControl} >
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sort}
          onChange={(e)=>{setSort(e.target.value);dispatch({type:"sort",payload:e.target.value});}}
          autoWidth
        >
         <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem value="low_to_high">Low to High</MenuItem>
          <MenuItem value="high_to_low">High to Low</MenuItem>
          
        </Select>
        </FormControl>
      </div>

      <Button onClick={handleClickOpen} className={classes.filterBtn}>Filter</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
            <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Customer Ratings</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          precision= {0.1}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Typography variant="body2">& above</Typography>
      </Box>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose();dispatch({type:'rating',payload:0});setRating(0);}} color="primary">
            Clear All
          </Button>
          <Button  onClick={()=>{handleClose();dispatch({type:'rating',payload:rating});}} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default Filter
