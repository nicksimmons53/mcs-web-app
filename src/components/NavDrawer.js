import React from 'react';
import { 
  Collapse,
  Divider, 
  Drawer, 
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles, 
  Typography
} from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import "@fontsource/comfortaa";
import logo from 'assets/logo.png';
import colors from 'assets/colors';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    backgroundColor: "#3D5A80",
    width: drawerWidth
  },
  drawerContainer: {
    flex: 1,
    marginTop: 20,
    overflow: 'auto'
  },
  header: {
    paddingLeft: 15,
    paddingTop: 15
  },
  headerText: {
    color: colors.ghost_white,
    fontFamily: 'Comfortaa', 
    fontWeight: 'bold', 
    marginLeft: 10
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  listItem: {
    color: colors.ghost_white,
  },
  selected: {
    borderColor: colors.ghost_white,
    borderLeft: 'solid',
    borderLeftWidth: '5',
  }
}));

function NavDrawer( ) {
  const classes = useStyles( );
  const [ selected, setSelected ] = React.useState(0);
  const [ open, setOpen ] = React.useState(true);

  const listItems = [
    {
      name: 'Dashboard',
      icon: <AssessmentIcon fontSize="large" className={classes.listItem}/>,
      rightIcon: null,
      optionalIcon: null,
      action: (index) => setSelected(index)
    },
    {
      name: 'User Modules',
      icon: <ViewModuleIcon fontSize="large" className={classes.listItem}/>,
      rightIcon: <ExpandMore fontSize="large" className={classes.listItem}/>,
      optionalIcon: <ExpandLess fontSize="large" className={classes.listItem}/>,
      action: (index) => setSelected(index)
    },
    {
      name: 'Profile Settings',
      icon: <PersonIcon fontSize="large" className={classes.listItem}/>,
      rightIcon: null,
      optionalIcon: null,
      action: (index) => setSelected(index)
    }
  ];

  const UserModules = ( ) => {
    return (
      <List disablePadding>
      </List>
    );
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left">

      <Grid container direction="row" alignItems="center" className={classes.header}>
        <img src={logo} alt="MC Surfaces, Inc."/>
        <Typography variant="h4" className={classes.headerText}>OneStop</Typography>
      </Grid>

      <div className={classes.drawerContainer}>
        <List>
          <Divider/>

          <ListSubheader className={classes.listItem}>
            Navigation
          </ListSubheader>

          <Divider/>

          { listItems.map((item, index) => (
            <div key={index}>
              <ListItem 
                button 
                selected={selected === index}
                className={selected === index && classes.selected}
                onClick={( ) => item.action(index)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.name} className={classes.listItem}/>

                {open ? item.rightIcon : item.optionalIcon}
              </ListItem>

              <Collapse in={open} unmountOnExit>
                <UserModules/>
              </Collapse>
            </div>
          ))}

          <Divider/>
          
          <ListSubheader className={classes.listItem}>
            User Actions
          </ListSubheader>
          <Divider/>
          <ListItem button>
            <ListItemText primary="Add User" className={classes.listItem}/>
            <ArrowForwardIosIcon className={classes.listItem}/>
          </ListItem>

          <Divider/>
          
          <ListSubheader className={classes.listItem}>
            Profile Actions
          </ListSubheader>
          <Divider/>
          <ListItem button>
            <ListItemText primary="Logout" className={classes.listItem}/>
            <ArrowForwardIosIcon className={classes.listItem}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Help" className={classes.listItem}/>
            <ArrowForwardIosIcon className={classes.listItem}/>
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
};

export default NavDrawer;