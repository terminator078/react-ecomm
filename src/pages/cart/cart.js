import { AppBar, Grid,Toolbar,IconButton,Typography, Button } from '@material-ui/core'
import React, { useContext } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ItemContext } from '../../context/context';
import CartItem from './cartItem';
import { useHistory } from 'react-router';
import useStyle from '../main/Components/style';

const Cart = () => {
    const {tempstate } =useContext(ItemContext)

    let history = useHistory()
    const classes = useStyle()

    return (
           <Grid container direction="column">
               <Grid item>
               <AppBar position="static">
                <Toolbar>
                 <IconButton onClick={()=>{history.push('/')}} edge="start"  color="inherit" aria-label="menu">
                  <ArrowBackIcon />
                </IconButton>
               <Typography variant="h6" >
                 Back to Shopping
               </Typography>
              </Toolbar>
              </AppBar>
               </Grid>

               <Grid item className={classes.cartLength}>
                 <Grid container>
                   <Grid item xs={false} sm={2}></Grid>
                      <Grid item xs={12} sm={8}>
                          <Typography> {tempstate.cart.length?`${tempstate.cart.length} items in cart`:`Nothing in cart`}</Typography>
                      </Grid>
                   <Grid item xs={false} sm={2}></Grid>
                 </Grid>
               </Grid>

               <Grid item>
                  <Grid container>
                      <Grid item xs={false} sm={2}></Grid>
                      <Grid item xs={12} sm={8}>
                          <Grid container dirction="column">
                              {
                                  tempstate.cart.map(element=>{
                                      return(
                                        <Grid item xs={12} sm={12} key={element.id}>
                                        <CartItem element={element} />
                                        </Grid>
                                      );
                                  })
                              }
                          </Grid>
                       </Grid>
                      <Grid item xs={false} sm={2}></Grid>
                  </Grid>
               </Grid>

               <Grid item className={classes.cartTotal}>
                  <Grid container spacing={2}>
                      <Grid item xs={false} sm={2}></Grid>
                      <Grid item xs={12} sm={8}>
                          <Grid container dirction="column">
                              <Grid item xs={12} sm={12}>

                                  {
                                      tempstate.cart.length?(
                                        <Grid container>
                                        <Grid item xs={false} sm={false} md={5}></Grid>
                                        <Grid item xs={12} sm={6} md={2}>
                                            <Grid container alignItems="center" justifyContent="center" >
                                              <Grid item>
                                                <Typography variant="h5" >Total  -</Typography>
                                               </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={1}>
                                           <Grid container alignItems="center" justifyContent="center" >
                                              <Grid item>
                                                <Typography variant="h6" >
                                                    ${
                                                        Math.round((tempstate.cart.reduce((total,element)=>total+element.price*element.qty,0) + Number.EPSILON) * 100) / 100
                                                    }
                                                </Typography>
                                               </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                          <Grid container alignItems="center" justifyContent="center" >
                                              <Grid item className={classes.checkout}>
                                              <Button variant="contained" color="primary">
                                                 Proceed to checkout
                                               </Button>
                                               </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                      ):(<></>)
                                  }

                                  
                                
                              </Grid>
                          </Grid>
                       </Grid>
                      <Grid item xs={false} sm={2}></Grid>
                  </Grid>
               </Grid>
              
           </Grid>
    )
}

export default Cart
