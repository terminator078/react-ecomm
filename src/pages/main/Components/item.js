import React, { useContext } from 'react'
import useStyle from './style';
import {Card,CardMedia,CardContent,Typography, CardActions, Button} from '@material-ui/core'
import {Rating} from '@material-ui/lab';
import { ItemContext } from '../../../context/context';
import { useHistory } from 'react-router';

const Item = (props) => {
    let history = useHistory()
    const classes =useStyle();
    const {tempstate,dispatch} = useContext(ItemContext);
    return (
                          <Card className={classes.card}>
                          <CardMedia className={classes.cardMedia} onClick={()=>{history.push(`/item/${props.element.id}`)}} image={props.element.image} title={props.element.title}/>
                          <CardContent className={classes.cardContent}>
                          <Typography variant="body1" className={classes.cardTitle} onClick={()=>{history.push(`/item/${props.element.id}`)}}>
                                   {props.element.title}
                              </Typography>
                              <Typography variant="body2">
                                   {props.element.category}
                              </Typography>
                              <Typography variant="body2" className={classes.ratingbox} >
                              <Rating name="size-small" disabled defaultValue={props.element.rating.rate} precision={0.1} size="small" /> ({props.element.rating.count})
                              </Typography>
                              <Typography >
                                   ${props.element.price}
                              </Typography>
                          </CardContent>
                          <CardActions>
                              {
                                  tempstate.cart.some(p=> p.id===props.element.id)?
                                  (<Button variant="text" color="secondary" onClick={()=>{dispatch({type:"remove",payload:props.element})}}>Remove from cart</Button>):
                                  (<Button variant="text" color="primary" onClick={()=>{dispatch({type:"add",payload:props.element})}}> Add to cart </Button>)
                              }
                          </CardActions>
                       </Card>
    )
}

export default Item
