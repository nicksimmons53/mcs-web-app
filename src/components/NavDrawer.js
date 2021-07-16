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
import { Link, Redirect } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import logo from 'assets/logo.png';
import colors from 'assets/colors';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'features/user/userSlice';
import Login from 'pages/Login';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    backgroundColor: colors.bdazzled_blue,
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
  listSubheader: {
    color: colors.ghost_white,
    fontSize: 16
  },
  selected: {
    borderColor: colors.ghost_white,
    borderLeft: 'solid',
    borderLeftWidth: '5',
  }
}));

function NavDrawer( ) {
  const classes = useStyles( );
  const { logout } = useAuth0( );
  const [ selected, setSelected ] = React.useState(0);
  const [ open, setOpen ] = React.useState(true);

  // const permissions = useSelector(selectUserInfo).Permissions;

  const listItems = [
    {
      name: 'Dashboard',
      icon: <AssessmentIcon fontSize="large" className={classes.listItem}/>,
      rightIcon: null,
      optionalIcon: null,
      destination: "/profile",
      action: (index) => setSelected(index)
    },
    {
      name: 'User Modules',
      icon: <ViewModuleIcon fontSize="large" className={classes.listItem}/>,
      rightIcon: <ExpandMore fontSize="large" className={classes.listItem}/>,
      optionalIcon: <ExpandLess fontSize="large" className={classes.listItem}/>,
      destination: "/null",
      action: (index) => setSelected(index)
    },
    {
      name: 'Profile Settings',
      icon: <PersonIcon fontSize="large" className={classes.listItem}/>,
      rightIcon: null,
      optionalIcon: null,
      destination: "/settings",
      action: (index) => setSelected(index)
    }
  ];

  const UserModules = ( ) => {
    let sales = { name: "Sales" };
    let approvedModules = [];

    // if (permissions.Admin === true) {
    //   approvedModules.push(sales);
    // }

    return (
      <List disablePadding>
        {
          approvedModules.map((module, index) => (
            <ListItem button>
              <ListItemText primary={module.name} className={classes.listItem}/>
              <ArrowForwardIosIcon className={classes.listItem}/>
            </ListItem>
          ))
        }
      </List>
    );
  };

  const UserActions = ( ) => {
    // if (permissions.Admin === false) {
    //   return <></>;
    // }

    return (
      <div>
        <ListSubheader className={classes.listSubheader}>
          User Actions
        </ListSubheader>

        <Divider/>

        <ListItem button>
          <ListItemText primary="Add User" className={classes.listItem}/>
          <ArrowForwardIosIcon className={classes.listItem}/>
        </ListItem>

        <ListItem button>
          <ListItemText primary="Edit User" className={classes.listItem}/>
          <ArrowForwardIosIcon className={classes.listItem}/>
        </ListItem>

        <Divider/>
      </div>
    );
  };

  const ProfileActions = ( ) => {
    return (
      <div>
        <ListSubheader className={classes.listSubheader}>
            Profile Actions
          </ListSubheader>
          <Divider/>
          <ListItem 
            button
            onClick={( ) => logout({ returnTo: "http://localhost:3000/login" })}>
            <ListItemText primary="Logout" className={classes.listItem}/>
            <ArrowForwardIosIcon className={classes.listItem}/>
          </ListItem>
          <ListItem button>
              <ListItemText primary="Help" className={classes.listItem}/>
              <ArrowForwardIosIcon className={classes.listItem}/>
          </ListItem>
      </div>
    );
  }

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

          <ListSubheader className={classes.listSubheader}>
            Navigation
          </ListSubheader>

          <Divider/>

          <ListItem 
            component={Link} 
            selected={false}
            onClick={( ) => console.log("CLICKED")}
            to="/profile">
            <ListItemIcon>
              <AssessmentIcon fontSize="large" className={classes.listItem}/>
            </ListItemIcon>

            <ListItemText primary="Dashboard" className={classes.listItem}/>
          </ListItem>
  
          <Collapse in={open} unmountOnExit>
            <UserModules/>
          </Collapse>

          <Divider/>

          <UserActions/>

          <ProfileActions/>
        </List>
      </div>
    </Drawer>
  )
};

export default NavDrawer;