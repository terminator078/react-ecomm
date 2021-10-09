import { Button, Card, Grid, IconButton, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import { ItemContext } from '../../context/context'
import useStyle from './Components/style';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const FullItem = () => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const {tempstate,dispatch} =useContext(ItemContext);

    let { id } = useParams();
    const item = tempstate.items.filter(element=> element.id===parseInt(id))[0];
    let history = useHistory();
    const classes= useStyle();

    return (
        <Card className={classes.fullCard}>
            <Grid container direction="column">
            <Grid item>
                <Grid container>
              <Grid item xs={false} sm={false} md={2}></Grid>
                <Grid item xs={12} sm={12} md={8}>
                <IconButton onClick={()=>{history.push('/')}} edge="start"  color="inherit" aria-label="menu">
                  <ArrowBackIcon />
                </IconButton>
                </Grid>
                <Grid item xs={false} sm={false} md={2}></Grid>
                 </Grid>
            </Grid>

            <Grid item> 
            <Grid container>
                <Grid item xs={false} sm={false} md={2}></Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                           <Grid container direction="column" alignItems="center" justifyContent="center">
                               <Grid item>
                                   <img src={item.image} alt="imagesi" className={classes.fullImage} />
                               </Grid>
                               <Grid item >
                                   <Grid container alignItems="center" justifyContent="center">
                                       <Grid item>
                            
                                               {
                                               tempstate.cart.some(p=> p.id===item.id)?
                                                (<Button className={classes.btn} variant="contained" onClick={()=>{dispatch({type:"remove",payload:item})}} style ={ {backgroundColor:"#ff3d00"}}>Remove from Cart</Button>)
                                                :(<Button className={classes.btn} variant="contained" onClick={()=>{dispatch({type:"add",payload:item})}} style ={ {backgroundColor:"#3f51b5"}}>Add to Cart</Button>)
                                               }
                                       </Grid>

                                       <Grid item>
                                         <Button className={classes.btn} variant="contained" style ={ {backgroundColor:"#ff9800"}} onClick={()=>{history.push('/cart')}}>
                                               Go to Cart
                                             </Button>
                                       </Grid>
                                    </Grid>
                               </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container direction="column">
                              <Grid item>
                                 <Typography className={classes.fullTypography} variant="h5"> {item.title} </Typography>
                                </Grid>
                                <Grid item>
                                 <Typography className={classes.fullTypography} variant="body2"> {item.category} </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.fullTypography}>
                                    <Rating name="size-small" disabled defaultValue={item.rating.rate} precision={0.1} size="small" />
                                    ({item.rating.count})
                                    </Typography>
                                </Grid>
                                <Grid item>
                                 <Typography className={classes.fullTypography} variant="h5"> ${item.price} </Typography>
                                </Grid>
                                <Grid item>
                                 <Typography className={classes.fullTypography} variant="body2"> {item.description} </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={false} md={2}></Grid>
            </Grid>
            </Grid>

            <Grid item>
                <Grid container>
              <Grid item xs={false} sm={false} md={2}></Grid>
                <Grid item xs={12} sm={12} md={8} className={classes.paddingBottom}>
                    
                </Grid>
                <Grid item xs={false} sm={false} md={2}></Grid>
                 </Grid>
            </Grid>

            </Grid>

        </Card>
    )
}

export default FullItem
