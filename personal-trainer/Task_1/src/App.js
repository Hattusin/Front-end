import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';

import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';


import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';

import Clientlist from './components/Clientlist';
import Trainings from './components/Trainings';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


function App() {
  const [value, setValue] = React.useState('Customers');
 
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={() => setValue("Customers")}>
          <PeopleIcon/>
          <ListItemText primary="Customers" style={{margin:5}}/>
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => setValue("Training")}>
          <DirectionsRunIcon/>
          <ListItemText primary="Training" style={{margin:5}}/>
        </ListItem>
        <Divider/>  
      </List>
    </div>
  );

  return (
    
    <div className="App">
      <div style={{flexGrow:1}}>
            <AppBar position="static">
                <Toolbar>
                {['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer(anchor, true)}>
                  <MenuIcon/>
                </IconButton>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
               
                <Typography variant="h6" style={{flexGrow:1}}>
                    Personal Trainer
                </Typography>
                
                </Toolbar>
            </AppBar>
            {value === 'Customers' && <div>
              <Clientlist />
              </div>}
              {value === 'Training' && <div>
              <Trainings />
              </div>}
            
            
            </div>
            
      
    </div>
  );
}

export default App;
