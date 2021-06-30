import React from 'react';
import { 
    AppBar, 
    Divider, 
    Grid,
    IconButton, 
    makeStyles,
    Toolbar
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import colors from 'assets/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 20
    },
    navBar: {
        backgroundColor: colors.bdazzled_blue,
        paddingLeft: 275
    },
    divider: {
        marginLeft: 10,
        marginRight: 10
    },
    icon: {
        color: colors.ghost_white,
        margin: 10
    }
}));

function NavBar( ) {
    const classes = useStyles( );

    return (
        <Grid container direction="row" className={classes.root} justify="space-between">
            <AppBar position="static" className={classes.navBar}>
                <Toolbar variant="dense">
                    <Grid container direction="row" alignItems="center">
                    </Grid>

                    <Grid container direction="row" alignItems="center" justify="flex-end">
                        <Divider orientation="vertical" flexItem/>

                        <IconButton className={classes.icon}>
                            <NotificationsNoneIcon fontSize="large"/>
                        </IconButton>

                        <Divider orientation="vertical" flexItem/>

                        <IconButton className={classes.icon}>
                            <AccountBoxIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default NavBar;