import React from 'react'
import NavTab from './Components/navTabs'
import Home from './Components/home'
import './main.css'
import { Grid } from '@material-ui/core'
import Filter from './Components/filter'
import NavBar from './Components/navBar';

const Main = ({handleLogout}) => {
    return (
        <Grid container direction="column">
           <Grid item>
           <NavBar handleLogout={handleLogout} />
            </Grid>

            <Grid item>
            <NavTab />
            </Grid>

            <Grid item >
                <Grid container>
                <Grid item xs={false} sm={2}></Grid>
                <Grid item xs={12} sm={8}>
                <Filter />
                </Grid>
                <Grid item xs={false} sm={2}></Grid>
                </Grid>
            </Grid>
            
            <Grid item >
            <Grid container>
                <Grid item xs={false} sm={2}></Grid>
                <Grid item xs={12} sm={8}>
                <Home />
                </Grid>
                <Grid item xs={false} sm={2}></Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default Main
