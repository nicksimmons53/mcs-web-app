import React, { useEffect } from 'react';
import { 
    Grid, 
    makeStyles
} from '@material-ui/core';
import colors from 'assets/colors';
import NavBar from 'components/NavBar';
import NavDrawer from 'components/NavDrawer';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth0User, getUserInfo, selectUserInfo } from 'features/user/userSlice';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#EBEDEF",
        left: 0,
        marginTop: 0,
        minHeight: "100vh",
        minWidth: "100%",
        padding: 0, 
        position: 'absolute',
        zIndex: 0
    },
    content: {
        flexGrow: 1,
        marginLeft: 350,
        zIndex: 1
    },
    link: {
        alignItems: "center",
        color: colors.burnt_sienna,
        display: "flex",
        fontWeight: "bold"
    }
}));

function Profile( ) {
    const classes = useStyles( );
    const { user, isLoading, isAuthenticated, logout } = useAuth0( );
    const dispatch = useDispatch( );

    if (typeof user === "undefined") {
        if (!isLoading) {
            logout( );
    
            return <Redirect to="/login"/>;
        }
    }

    if (isAuthenticated) {
        dispatch(setAuth0User(user));
        dispatch(getUserInfo(user.email));
    }

    return (
        <Grid className={classes.root}>
            <NavBar/>

            <NavDrawer/>

            <Grid className={classes.content}>
                <div className={classes.toolbar}>
                </div>
            </Grid>
        </Grid>
    )
}

export default Profile;
