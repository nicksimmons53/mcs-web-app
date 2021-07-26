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
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import "@fontsource/comfortaa";
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import logo from 'assets/logo.png';
import colors from 'assets/colors';
import RBAC from 'components/RBAC';

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
    fontSize: 38,
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
    fontSize: 18
  },
  userModuleItem: {
    color: colors.ghost_white
  },
  moduleItem: {
    marginLeft: '10%'
  },
  selected: {
    borderColor: colors.ghost_white,
    borderLeft: 'solid',
    borderLeftWidth: '5',
  },
  selectedUserModule: {
    borderColor: colors.ghost_white,
    borderLeft: 'solid',
    borderLeftWidth: '5',
    marginLeft: '10%'
  }
}));

function NavDrawer({ user }) {
  const classes = useStyles( );
  const { logout } = useAuth0( );
  const [ open, setOpen ] = React.useState(false);
  const location = useLocation( );
 
  const logoutAndClear = ( ) => {
    localStorage.removeItem("user");
    logout({ returnTo: "http://localhost:3000/login" });
  }

  const UserModules = ( ) => {
    return (
      <List disablePadding>
        <RBAC user={user} roles={[ ]}>
          <ListItem 
            button 
            component={Link}
            to="/profile/modules/accounting"
            selected={location.pathname === "/profile/modules/accounting"}
            className={location.pathname === "/profile/modules/accounting" ? classes.selectedUserModule : classes.moduleItem}>
            <ListItemIcon>
              <AccountBalanceIcon fontSize="large" className={classes.listItem}/>
            </ListItemIcon>
            <ListItemText primary="Accounting" className={classes.userModuleItem}/>
          </ListItem>
        </RBAC>

        <RBAC user={user} roles={[ ]}>
          <ListItem 
            button 
            component={Link}
            to="/profile/modules/expediting"
            selected={location.pathname === "/profile/modules/expediting"}
            className={location.pathname === "/profile/modules/expediting" ? classes.selectedUserModule : classes.moduleItem}>
            <ListItemIcon>
              <ScheduleIcon fontSize="large" className={classes.listItem}/>
            </ListItemIcon>
            <ListItemText primary="Expediting" className={classes.userModuleItem}/>
          </ListItem>
        </RBAC>

        <RBAC user={user} roles={["Sales.Allowed"]}>
          <ListItem 
            button 
            component={Link}
            to="/profile/modules/sales"
            selected={location.pathname === "/profile/modules/sales"}
            className={location.pathname === "/profile/modules/sales" ? classes.selectedUserModule : classes.moduleItem}>
            <ListItemIcon>
              <PeopleIcon fontSize="large" className={classes.listItem}/>
            </ListItemIcon>
            <ListItemText primary="Sales" className={classes.userModuleItem}/>
          </ListItem>
        </RBAC>
      </List>
    );
  };

  const UserActions = ( ) => {
    return (
      <RBAC user={user} roles={[ ]}>
        <div>
          <ListSubheader className={classes.listSubheader}>
            User Actions
          </ListSubheader>

          <Divider/>

          <ListItem 
            component={Link}
            selected={location.pathname === "/profile/admin/add_user"}
            className={location.pathname === "/profile/admin/add_user" ? classes.selected : null}
            to="/profile/admin/add_user">
            <ListItemText primary="Add User" className={classes.listItem}/>
            <ArrowForwardIosIcon className={classes.listItem}/>
          </ListItem>

          <ListItem 
            component={Link}
            selected={location.pathname === "/profile/admin/edit_user"}
            className={location.pathname === "/profile/admin/edit_user" ? classes.selected : null}
            to="/profile/admin/edit_user">
            <ListItemText primary="Edit User" className={classes.listItem}/>
            <ArrowForwardIosIcon className={classes.listItem}/>
          </ListItem>

          <Divider/>
        </div>
      </RBAC>
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
            onClick={( ) => logoutAndClear( )}>
            <ListItemText primary="Logout" className={classes.listItem}/>
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
        <Typography className={classes.headerText}>OneStop</Typography>
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
            selected={location.pathname === "/profile"}
            className={location.pathname === "/profile" ? classes.selected : null}
            to="/profile">
            <ListItemIcon>
              <AssessmentIcon fontSize="large" className={classes.listItem}/>
            </ListItemIcon>

            <ListItemText primary="Dashboard" className={classes.listItem}/>
          </ListItem>

          <ListItem onClick={( ) => setOpen(!open)}>
            <ListItemIcon>
              <ViewModuleIcon fontSize="large" className={classes.listItem}/>
            </ListItemIcon>

            <ListItemText primary="User Modules" className={classes.listItem}/>

            { open ? 
              <ExpandLess fontSize="large" className={classes.listItem}/>
              :
              <ExpandMore fontSize="large" className={classes.listItem}/>
            }
          </ListItem>
  
          <Collapse in={open} unmountOnExit>
            <UserModules/>
          </Collapse>

          <ListItem 
            component={Link} 
            selected={location.pathname === "/profile/settings"}
            className={location.pathname === "/profile/settings" ? classes.selected : null}
            to="/profile/settings">
            <ListItemIcon>
              <SettingsIcon fontSize="large" className={classes.listItem}/>
            </ListItemIcon>

            <ListItemText primary="Profile Settings" className={classes.listItem}/>
          </ListItem>

          <Divider/>

          <UserActions/>

          <ProfileActions/>
        </List>
      </div>
    </Drawer>
  );
};

export default NavDrawer;