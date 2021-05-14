import React from 'react';
import { 
  Divider, 
  Drawer, 
  Grid,
  List,
  ListItem,
  makeStyles, 
  Typography
} from '@material-ui/core';

const drawerWidth = 275;

const useStyles = makeStyles({
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  header: {
    paddingLeft: 15,
    paddingTop: 15
  }
});

function NavDrawer( ) {
  const classes = useStyles( );

  return (
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}>

        <Grid container direction="row" alignItems="center" justify="space-between" className={classes.header}>
          <Typography variant="h6">User Modules</Typography>
        </Grid>

        <List>
          <Divider/>
          {['Sales'].map((selection, index) => (
            <>
            <ListItem button key={selection}>{selection}</ListItem>
            <Divider/>
            </>
          ))}
          <ListItem button>Logout</ListItem>
          <ListItem button>Help</ListItem>
        </List>
      </Drawer>
  )
}

export default NavDrawer;