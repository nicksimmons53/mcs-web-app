import React from 'react';
import { 
    AppBar,
    Avatar, 
    Badge, 
    Divider, 
    Grid,
    IconButton, 
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { useSelector } from 'react-redux';
import { selectAuth0UserInfo } from 'features/user/userSlice';
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
        backgroundColor: "transparent",
        color: colors.ghost_white,
        margin: 10
    },
    font: {
        color: colors.ghost_white
    }
}));

function NavBar( ) {
    const classes = useStyles( );
    const user = useSelector(selectAuth0UserInfo);

    return (
        <Grid container direction="row" className={classes.root} justify="space-between">
            <AppBar position="static" className={classes.navBar}>
                <Toolbar variant="dense">
                    <Grid container direction="row" alignItems="center">
                    </Grid>

                    <Grid container direction="row" alignItems="center" justify="flex-end">
                        <Divider orientation="vertical" flexItem/>

                        <IconButton className={classes.icon}>
                            <Badge color="secondary" badgeContent={0} showZero>
                                <NotificationsNoneIcon fontSize="large"/>
                            </Badge>
                        </IconButton>

                        <Divider orientation="vertical" flexItem/>

                        <IconButton className={classes.icon}>
                            <Avatar alt={user.name} src={user.picture}/>
                        </IconButton>

                        <Typography className={classes.font}>{user.name}</Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default NavBar;