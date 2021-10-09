import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ItemContext } from '../../../context/context';

const TabPanel =(props)=> {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const LinkTab =(props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  navFont: {
    [theme.breakpoints.down('md')]: {
      fontSize:"10px"
    }
  }
}));

 const NavTabs= ()=> {

    const {tempstate,dispatch} =useContext(ItemContext)

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let l=0;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
        {

            tempstate.categories.map(element=>{
                return <LinkTab className={classes.navFont} key ={l++} label={element} onClick={()=>{dispatch({type:"category",payload:element})}} /> 
            })
        }
        </Tabs>
      </AppBar>
    </div>
  );
}


export default NavTabs

