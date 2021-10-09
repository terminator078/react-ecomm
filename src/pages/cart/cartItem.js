import { Button, ButtonGroup, Card, Grid, IconButton, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab';
import React, { useContext, useState } from 'react'
import { ItemContext } from '../../context/context'
import useStyle from '../main/Components/style';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router';

const CartItem = (props) => {

    let history = useHistory()

    const [count,setCount]= useState(props.element.qty)

    const {dispatch} = useContext(ItemContext)

    const classes = useStyle()

    return (
        <Card className={classes.cartCard}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" >
            <Grid item xs={12} sm={2} >
              <Grid container alignItems="center" justifyContent="center" >
                    <Grid item>
                <img onClick={()=>{history.push(`/item/${props.element.id}`)}} className= {classes.cartCardMedia} src={props.element.image} alt="imageis" />
                    </Grid>
               </Grid>
            </Grid>

            <Grid item xs={12} sm={3}>
                <Grid container alignItems="center" justifyContent="center" >
                    <Grid item>
                    <Typography onClick={()=>{history.push(`/item/${props.element.id}`)}} className= {classes.cardTitle} variant="body2" >{props.element.title}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={2}>
            <Grid container alignItems="center" justifyContent="center" >
                    <Grid item>
                    <Rating name="size-small" disabled defaultValue={props.element.rating.rate} precision={0.1} size="small" />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={1}>
                <Grid container alignItems="center" justifyContent="center" >
                    <Grid item>
                    <Typography variant="body2" >${props.element.price}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={3}>
               <Grid container alignItems="center" justifyContent="center" >
                    <Grid item>
                    <ButtonGroup>
                   <Button
                     aria-label="reduce"
                       onClick={() => {
                         dispatch({type:"change_qty",payload:{...props.element,qty:Math.max(count - 1, 1)}});
                         setCount(Math.max(count - 1, 1));
                       }}
                   >
                   <RemoveIcon fontSize="small" />
                  </Button>
                  <Button>
                      {count}
                 </Button>
                 <Button
                   aria-label="increase"
                     onClick={() => {
                       dispatch({type:"change_qty",payload:{...props.element,qty:count+1}});
                       setCount(count + 1);
                     }}
                  >
               <AddIcon fontSize="small" />
              </Button>
                </ButtonGroup>
                    </Grid>
                </Grid>
          </Grid>

            <Grid item xs={12} sm={1}>
              <Grid container alignItems="center" justifyContent="center" >
                    <Grid item>
                    <IconButton color="inherit" onClick={()=>{dispatch({type:"remove",payload:props.element})}}>
                     <DeleteIcon />
                    </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Card>
    )
}

export default CartItem
