import React, { useContext } from 'react'
import { ItemContext } from '../../../context/context';
import Item from './item';
import {Grid} from '@material-ui/core'

const Home = () => {

    const {tempstate} = useContext(ItemContext);

    return (
         <Grid container spacing={2}>
                   {
                       tempstate.items.map(element=>
                        <Grid item key={element.id} xs={12} sm={6} md={4} lg={3}><Item element={element}/></Grid>
                       )
                   }
         </Grid>
    )
}

export default Home
